const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const {
  gptInstructions,
  stylistMessages,
  summaryPrompt,
} = require("./server/utilities");

// create app
const app = express();
app.use(cors({ origin: "http://localhost:3001" }));

// scrape request
app.get("/scrape-depop", async (req, res) => {
  //define url
  const searchString = req.query.searchstring;
  const url = `https://www.depop.com/search/?q=${searchString}`;

  try {
    //open url
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.setViewport({ width: 1080, height: 720 });
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const pageNum = req.query.page;

    console.log("PAGE NUMBER IN EVAL FUNC", pageNum);

    await page.evaluate(async (pageNum) => {
      for (let i = 2; i <= pageNum; i++) {
        await window.scrollBy(0, 720);
      }
    }, pageNum);

    //make sure images load
    await page.waitForSelector("img");

    // get all the listings from the webpage
    const { elements, numOfListings } = await page.evaluate(async () => {
      const listItems = document
        .querySelector("[data-testid='search__results']")
        .querySelectorAll("li");
      // retrieve necessary data from elements
      let els = [];
      listItems.forEach((it) => {
        let image = it.querySelector("img").getAttribute("src");
        if (image?.length) {
          const alt = it.querySelector("img").alt;
          const price = it.querySelector("p").innerText;
          const link = it.querySelector("a").getAttribute("href");
          els.push({ image, alt, price, link });
        }
      });
      return { elements: els, numOfListings: listItems.length };
    });
    // set status and element data
    res.status(200);
    res.json({ elements, numOfListings });
    //close the browser window
    await browser.close();
  } catch (error) {
    throw error;
  }
});

app.get("/stylist", async (req, res) => {
  try {
    // a list of all messages not yet included in the summary
    const messages = req.query.messages;

    // after each user response, we create a summary of the conversation to shrink our token usage and prevent url from exceeding length limits
    const summary = req.query.summary;

    // when there is no summary, we have not yet made any requests, so we return the default initial messages
    if (!summary?.length) {
      const parsedMessages = stylistMessages.map((m) => ({
        role: "assistant",
        content: m,
      }));
      res.send(parsedMessages);
    } else {
      // when there is a summary and messages we send them along for a GPT response
      const configuration = new Configuration({
        apiKey: "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",
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          // include our original instructions
          { role: "assistant", content: gptInstructions },
          // summary
          { role: "user", content: summary },
          // messages not yet included in summary
          ...messages,
        ],
        stop: ["user"],
      });

      // return the single response msg
      console.log("got response");
      res.send([completion.data.choices[0].message]);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/stylist-summary", async (req, res) => {
  try {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${summaryPrompt} ${
        req.query.summary
      }. Messages: ${req.query.messages.map((m) => `${m.role}: ${m.content}`)}`,
      temperature: 0,
      max_tokens: 300,
    });

    console.log("got summary");
    res.send(completion.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
