const adminAuth = (req,res,next) => {
    console.log("Admin Auth is getting checked")
    token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request");
    }
    else{
        next();
    }

}

module.exports = {
    adminAuth
}

