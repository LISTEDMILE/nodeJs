const path = require('path');

// is syntax se hm ek root dir define kar skte h taki agar ham kahi path define kare to direct iska path se start karke path likh ske for ex see pathUtilsRouter.js.....
module.exports = path.dirname(require.main.filename);