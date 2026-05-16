export const roleMiddleware = (...role) => {
  return (req,res,next) => {
    // Check role exists
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    if(!role.includes(req.user.role)){
      return res.status(403).json({
        success: false,
        message: "Access forbidden"
      });
    }

    next();
  }
}