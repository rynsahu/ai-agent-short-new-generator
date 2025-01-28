import express from 'express';
import dotenv from 'dotenv';
import generateShortNews from './services/generateShortNews';

dotenv.config();

const app = express();
const port = 11333;

app.get('/news', async (req: any, res: any) => {
  try {
    const article = req.query.article;
    
    if (!article) {
      return res.status(400).json({ error: 'Article text is required' });
    }

    const result = await generateShortNews(article);
    console.log(result);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>News Summary</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .summary {
              border: 1px solid #ddd;
              padding: 20px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="summary">
            ${result}
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate news summary' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
