import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    
  
    render() {
      return (
        <Html>
          <Head>
          <script
            src="https://www.paypal.com/sdk/js?client-id=AXl1oXlW1V6nxTBH8jdKIYCYkQTqooXRHyKu2Fxhw0XGiCQ41gpj2-hxIEdW6H7Kv0BpK3U5AxNvlKK4">
        </script>
         </Head>
         <body>
             <Main/>
            <NextScript/>
            
         </body>
        </Html>
      )
    }
}

export default MyDocument;