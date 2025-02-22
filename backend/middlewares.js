module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "You must be signed in to do that");
      return res.redirect("/login");
    }
    next();
};
  
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
  
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
      req.flash("error", "You dont have permission to do that");
      return res.redirect(`/listings/${id}`);
    }
  
    next();
};

  
module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewId, id } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You dont have permission to do that");
      return res.redirect(`/listings/${id}`);
    }
    next();
};
  