"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//function to check user is authentified as admin
function ensureAdmin(req, res, next) {
    const isAdmin = req.user && req.user.username === 'admin';
    if (isAdmin)
        return next();
    res.status(401).json({ error: 'Unauthorized' });
}
exports.default = ensureAdmin;
