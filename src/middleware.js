//EXAMPLE MIDDLEWARE

// async function requestLoggerAndDefaultRedirectMW(req, res, next) {
//     let auth;
//     if (req.session.user) {
//       if (req.session.user.role === "user") {
//         auth = "(Authenticated User)";
//       }
//       if (req.session.user.role === "admin") {
//         auth = "(Authenticated Administrator User)";
//       }
//     } else {
//       auth = "(Non-Authenticated)";
//     }
//     console.log(
//       "[" +
//         new Date().toUTCString() +
//         "]: " +
//         req.method +
//         " " +
//         req.originalUrl +
//         " " +
//         auth
//     );

//     if (req.session.user && req.originalUrl === "/") {
//       if (req.session.user.role === "admin") {
//         return res.redirect("/administrator");
//       }
//       if (req.session.user.role === "user") {
//         return res.redirect("/user");
//       }
//     } else if (req.originalUrl === "/") {
//       return res.redirect("/signinuser");
//     }

//     next();
//   }

//   async function signInUserRedirects(req, res, next) {
//     if (req.session.user) {
//       if (req.session.user.role === "admin") {
//         return res.redirect("/administrator");
//       }
//       if (req.session.user.role === "user") {
//         return res.redirect("/user");
//       }
//     }

//     next();
//   }

//   async function signUpUserRedirects(req, res, next) {
//     if (req.session.user) {
//       if (req.session.user.role === "admin") {
//         return res.redirect("/administrator");
//       }
//       if (req.session.user.role === "user") {
//         return res.redirect("/user");
//       }
//     }

//     next();
//   }

//   async function userRedirects(req, res, next) {
//     if (!req.session.user) {
//       return res.redirect("/signinuser");
//     }

//     next();
//   }

//   async function administratorRedirects(req, res, next) {
//     if (!req.session.user) {
//       return res.redirect("/signinuser");
//     }
//     if (req.session.user && req.session.user.role === "user") {
//       return res.status(403).render("error", {
//         title: "Forbidden",
//         error: "You do not have permission to view this page.",
//         redirect: "/user",
//         redirectmsg: "Return to user page.",
//         themePreference: req.session.user.themePreference,
//       });
//     }

//     next();
//   }

//   async function signOutUserRedirects(req, res, next) {
//     if (!req.session.user) {
//       return res.redirect("/signinuser");
//     }
//     next();
//   }

//   const middleware = {
//     requestLoggerAndDefaultRedirectMW,
//     signInUserRedirects,
//     signUpUserRedirects,
//     userRedirects,
//     administratorRedirects,
//     signOutUserRedirects,
//   };


 const denyPrivateAccess = async (req, res, next) => {
    if (!req.session.userId){
        
        if (req.originalUrl.includes('private')){
            return res.redirect('/users/login');
        }
    }

    next();
}

const denySnippetModification = async (req, res, next) => {
    const method = req.method;

    if (!req.session.userId){
        if (['POST', 'PATCH', 'DELETE'].includes(method.toUpperCase())){
            return res.redirect('/users/login')
        }
    }   

    next(); 
}

const loggedInUsersRedirect = async (req, res, next) => {
    if (req.session.userId){
        return res.redirect('/private')
    }

    next();
}

const middleware = {
    denyPrivateAccess,
    denySnippetModification,
    loggedInUsersRedirect
}


export default middleware;
