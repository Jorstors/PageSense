// Function to shrink or expand html container to fit screen size (responsive iframe)
const formatHTML = (html: string): string => {
    if (!html) return '';

    // Add viewport meta tag and responsive styling
    const responsiveStyle = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        max-width: 100%;
      }
      table {
        width: 100% !important;
        max-width: 100% !important;
      }
      table[width="700"] {
        width: 100% !important;
        max-width: 700px !important;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      /* Disable links */
      a {
        pointer-events: none;
        cursor: default;
        text-decoration: none;
        color: inherit;
      }
      @media (max-width: 768px) {
        table[width="700"] td {
          padding: 16px !important;
        }
        table td[style*="width:50%"] {
          display: block !important;
          width: 100% !important;
          padding: 0 0 16px 0 !important;
        }
        h2 {
          font-size: 20px !important;
        }
        div[style*="font-size:48px"] {
          font-size: 36px !important;
        }
      }
    </style>`;

    // Insert responsive style into the head
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${responsiveStyle}`);
    } else if (html.includes('<html>')) {
      html = html.replace('<html>', `<html><head>${responsiveStyle}</head>`);
    } else {
      html = `<head>${responsiveStyle}</head>${html}`;
    }

    return html;
  }

export default formatHTML;
