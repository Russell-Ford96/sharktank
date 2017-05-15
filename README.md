# budget
Group training project for Synechron

<h2>Setup</h2>
<ul>
<li>Ensure you have npm >= 4.x.x and node >= 7.x.x</li>
<li>Clone this repo and cd into it</li>
<li>Put your db password in server/database/env.js</li>
mockup for this file is like so:
<code>
const express = require('express');
var DB_PASS = 'YOUR PASSWORD HERE';

module.exports = DB_PASS;
</code>
<li>npm run build; node server;</li>
</ul>
