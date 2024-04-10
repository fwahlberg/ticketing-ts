process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');
 
const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkyTURVNVpXVXpaalkzTnpjeVpqVmtaV1l6T0dZMFlpSXNJbVZ0WVdsc0lqb2lkR1Z6ZERJeFFIUmxjM1F1WTI5dElpd2lhV0YwSWpveE56RXhOalEwTXpnM2ZRLks1cm1pc0R2Nm9ySGtVM2hZaUtrdnVFVUw1TGpHUDF0THNqX055RU5Cc3MifQ==';
 
const doRequest = async () => {
  const { data } = await axios.post(
    `https://ticketing.com/api/tickets`,
    { title: 'ticket', price: 5 },
    {
      headers: { cookie },
    }
  );
 
  await axios.put(
    `https://ticketing.com/api/tickets/${data.id}`,
    { title: 'ticket', price: 10 },
    {
      headers: { cookie },
    }
  );
 
  axios.put(
    `https://ticketing.com/api/tickets/${data.id}`,
    { title: 'ticket', price: 15 },
    {
      headers: { cookie },
    }
  );
 
  console.log('Request complete');
};
 
// (async () => {
//   for (let i = 0; i < 50; i++) {
//     doRequest();
//   }
// })();

var i = 0;                  //  set your counter to 1

function myLoop() {         //  create a loop function
  setTimeout(async function() {   //  call a 3s setTimeout when the loop is called
    console.log('hello'); 
    doRequest();  //  your code here
    i++;                    //  increment the counter
    if (i < 400) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 10)
}

myLoop();     
 