# Amazon Echo Skill for getting Reddit stories

### How to enable the skill:

 * For now you have to download the zip folder in this repo
 * Upload it as an AWS lambda in Node format and make it available as a Skill
 * Build a skill and reference it in your developer portal. 

Interaction model:
{
  "intents": [ {
    "intent": "WhatIs",
    "slots": [ {
       "name": "Reddit",
       "type": "LITERAL"
    } ]
  } ]
}

Utterance: WhatIs {what are the top stories on reddit | Reddit}

Soon this skill will be available for download.

### Once this skill is enabled for your Alexa you can use it by:

1. Alexa, ask reddit subreddit name
2. Alexa will respond with "What is, "subreddit name"
3. If this is incorrect, just repeat the correct subs name
4. If it is correct, you can replay with; yes, hot, top, rising, new, controversial, or gilded.
5. Alexa will rattle off the top 5 stories of the sub and category.

### Help needed

Homophones are a real pain. I will be making another .js file which will hold specific names for more difficult sub routes. It would be great if some people helped me build a complete list for the more difficult subs. 

An Example: Defense of the Ancients -> Dota2





---
This Amazon Echo Skill was created by Steven Inouye. 
