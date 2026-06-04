module.exports = function aboutBruno({ version }) {
  const currentYear = new Date().getFullYear();
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1, user-scalable=yes">
        <title>About Daffy</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 0;
                padding: 10px;
                background-color: #f4f4f4;
                color: #333;
            }
            .logo {
                margin-top: 0px;
            }
            .title {
                font-size: 24px;
                margin-top: 5px;
                font-weight: bold;
                color: #222;
            }
            .description {
                font-size: 12px;
                color: #222;
                margin-top: 5px;
            }
            .buttons {
                margin-top: 5px;
            }
            .footer {
                margin-top: 5px;
                padding: 5px;
                font-size: 14px;
                color: #555;
            }
            .link {
                display: inline-block;
                margin-top: 10px;
                padding: 10px 15px;
                background-color: #0e9e8f;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s;
            }
            .link:hover {
                background-color: #0b7d72;
            }
        </style>
    </head>
    <body>
      <div class="logo">
      </div>
        <svg width="100" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none">
          <ellipse cx="36" cy="44" rx="18" ry="14" fill="#0e9e8f" />
          <circle cx="50" cy="28" r="10" fill="#0e9e8f" />
          <circle cx="53" cy="26" r="2.5" fill="#ffffff" />
          <circle cx="53.8" cy="25.8" r="1.2" fill="#1a1a1a" />
          <path d="M58 30 Q65 29 64 32 Q63 35 58 33 Z" fill="#f59e0b" />
          <path d="M24 42 Q30 34 38 38 Q32 44 26 48 Z" fill="#0b7d72" stroke="#0b7d72" stroke-width="0.5" />
          <path d="M18 40 Q14 36 16 33 Q18 36 20 38 Z" fill="#0b7d72" />
          <path d="M19 42 Q14 40 15 37 Q17 39 20 41 Z" fill="#0e9e8f" />
          <path d="M20 54 Q28 52 36 54 Q44 56 52 54" stroke="#5eead4" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6" />
          <path d="M24 57 Q32 55 40 57 Q48 59 54 57" stroke="#5eead4" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.4" />
        </svg>
      <h2 class="title">Daffy ${version}</h2>
      <footer class="footer">
          ©${currentYear} Daffy Software Inc
      </footer>
    </body>
    </html>
  `;
};
