import './globals.css'

export const metadata = {
  title: 'autojobs.ch – Schweizer Jobportal für die Automobilbranche',
  description: 'Finde deinen Job in der Schweizer Automobilbranche',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Syne:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}