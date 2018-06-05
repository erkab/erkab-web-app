node-clockwork
==============

Install
---
```bash
npm install clockwork
```

Simple Usage
---

```js
var clockwork = require('clockwork')({key:'your clockwork key here'});


// Send a message
clockwork.sendSms({ To: '447123456789', Content: 'Test!'}, function(error, resp) {
    if (error) {
    	console.log('Something went wrong', error);
	} else {
		console.log('Message sent to',resp.responses[0].to);
		console.log('MessageID was',resp.responses[0].id);
	}
});

```
Getting an api key
---

First, head over to [clockwork](http://www.clockworksms.com) and signup if you're not already signed up. Once signed up, log in to your clockwork account and add a new API Key (from the top menu choose Sending -> API Keys). 


Sending A Message
---

You can send a single message as shown above. If you have multiple messages to send, it's much more efficient to send them in bulk by passing an array of messages to `sendSms`:

```js
clockwork.sendSms([{ To: '447123456789', Content: 'Test!'},
				   { To: '447123456781', Content: 'Another one'}], function(error, resp) {
    if (error) {
    	console.log('Something went wrong', error);
	} else {
		console.log('Messages sent');
	}
});
```

The second argument to sendSms is callback that you provide. The callback will be called with 2 json objects, `error` and `response`. If a general error occurs, then error will look like this:

```js
{
	success: false,
	errNo: X,
	errDesc: 'Error description here'
}
```

Otherwise, error will be null, and the response will contain an array of sms responses, one for each message sent. In the example above where 2 messages were sent, assuming nothing went wrong, the response will look like this:

```js
{
	responses: [
		{to: '447123456789', success: true, id: 'MessageId', errNo: '', ErrDesc: ''},
		{to: '447123456781', success: true, id: 'MessageId', errNo: '', ErrDesc: ''}
	]	
}
```

Currently, the nodejs wrapper only supports setting the to, from and content of sms messages. If you need to set other options, raise an issue in github and we'll try to get it done for you. For more information about sending messages and the responses, [see the clockwork sms api documentation](http://www.clockworksms.com/doc/clever-stuff/xml-interface/send-sms/)

Getting Your Balance
---

```js
clockwork.getBalance(function(error, credit) {
    if (error) {
    	console.log('Something went wrong', error);
	} else {
		console.log('Your balance',credit);
	}
});
```

Again, if a general error occurs then error will be populated accordingly. Otherwise, the response contains your credit, in a format similar to this:

```js
{
	accountType: 'PAYG',
	currency: {code: 'USD', symbol: '$'},
	balance: '100.0'
}
```
