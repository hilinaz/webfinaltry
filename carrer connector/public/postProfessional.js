var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Attach event listener to the post form submission
    (_a = document
        .getElementById('postForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        function decodeJWT(token) {
            var payload = token.split('.')[1];
            var decodedPayload = atob(payload);
            return JSON.parse(decodedPayload);
        }
        var accessToken, decodedToken, userId, profession, experienceRange, phone_number, cv, description, wantedSalary, gender, postData, response, data, successMessage, formContainer, errorMessage, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    event.preventDefault();
                    accessToken = localStorage.getItem('accessToken');
                    if (!accessToken) {
                        alert('You must be logged in to create a post.');
                        window.location.href = 'login.html';
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    decodedToken = decodeJWT(accessToken);
                    console.log(decodedToken);
                    userId = decodedToken.id;
                    console.log(userId);
                    if (!userId) {
                        return [2 /*return*/];
                    }
                    profession = document.getElementById('Profession').value;
                    experienceRange = document.getElementById('experiance').value;
                    phone_number = document.getElementById('phoneNumber').value;
                    cv = document.getElementById('cv').value;
                    description = document.getElementById('message').value;
                    wantedSalary = document.getElementById('pay').value;
                    gender = (_a = document.querySelector('input[name="gender"]:checked')) === null || _a === void 0 ? void 0 : _a.value;
                    if (!profession ||
                        !experienceRange ||
                        !phone_number ||
                        !cv ||
                        !description ||
                        !wantedSalary ||
                        !gender) {
                        alert('Please fill in all fields.');
                        return [2 /*return*/];
                    }
                    postData = {
                        profession: profession,
                        experienceRange: experienceRange,
                        phone_number: phone_number,
                        cv: cv,
                        description: description,
                        wantedSalary: wantedSalary,
                        gender: gender,
                        userId: userId,
                    };
                    return [4 /*yield*/, fetch("http://localhost:3000/api/post/create/".concat(userId), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(accessToken),
                            },
                            body: JSON.stringify(postData),
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = "\n          <span style=\"color: green; font-size: 24px;\">&#10003;</span> post successful!";
                    formContainer = document.getElementById('postForm');
                    if (formContainer) {
                        formContainer.appendChild(successMessage);
                    }
                    window.location.href = 'postView.html';
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.text()];
                case 5:
                    errorMessage = _b.sent();
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    console.error('Error during post creation:', error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
});
