'use strict';
let to = require('await-to-js').to;
module.exports = function(User) {

    User.createUser = async function(req) {
      let userId = req.user_id
      console.log(userId)
      console.log("HAHAH")
      let contestId = "1"
      let [err, user] = await to(User.findOne({where: {userId: userId}}))
      

      if (user === null) {
        let userData = {
          userId:userId,
          fullName:req.body.userName,
          gender:req.body.userGender,
          age: req.body.userAge,
        }
        User.upsert(userData)   
      }  
      return {
        "metadata": {
          "app_name": "Contest",
          "app_id": 123456,
          "title": "BIT",
          "submit_button": {
            "label": "Bắt đầu contest",
            "background_color": "#6666ff", 
            "cta": "request",
            "url": "http://bitone.herokuapp.com/api/Contests/1/firstQuestion"
          },
          "elements": [
            {
                "type": "text",
                "style": "heading",
                "content": "Bạn đã sẵn sàng chưa?"
            },
            {
              "type": "input",
            }
          ]
        }
      };
      
    }


    User.remoteMethod(
        'createUser',  {
            http: {path: '/createUser', verb:  'post'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                ],
            returns: [
              {arg: 'data', type:'object'}],
        },
    )
};
