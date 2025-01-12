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
document.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    // Function to render professionals based on data
    function renderProfessionals(filteredProfessionals) {
        professionalsContainer.innerHTML = ''; // Clear previous entries
        filteredProfessionals.forEach(function (professional) {
            var _a, _b;
            var profileCard = document.createElement('div');
            profileCard.className = 'row d-flex align-items-center mb-4';
            var imagePath = professional.gender === 'Male'
                ? 'image/Boy_Avatar.jpg'
                : 'image/Girl_Avar.png';
            profileCard.innerHTML = "\n          <div class=\"col-lg-4 col-md-6 mb-4 mb-md-0 p-5\">\n            <img src=\"".concat(imagePath, "\" alt=\"").concat(((_a = professional.user) === null || _a === void 0 ? void 0 : _a.name) || 'Unknown', "\" class=\"img-fluid rounded-circle\">\n          </div>\n          <div class=\"col-lg-8 col-md-6 pt-lg-6\">\n            <h5 class=\"card-title text-primary\">").concat(((_b = professional.user) === null || _b === void 0 ? void 0 : _b.fullname) || 'Unknown', "</h5>\n            <h6>").concat(professional.profession, "</h6>\n            <h6>Contact: ").concat(professional.phone_number, "</h6>\n            <p class=\"p-3 pt-1\">\n              ").concat(professional.description.substring(0, 450), "...\n              <a href=\"details.html?id=").concat(professional.cv, "\">View more</a>\n            </p>\n          </div>\n        ");
            professionalsContainer.appendChild(profileCard);
        });
    }
    var professionalsContainer, searchInput, searchForm, response, professionals_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                professionalsContainer = document.querySelector('.container.mb-4');
                searchInput = document.querySelector('#searchInput');
                searchForm = document.querySelector('#searchForm');
                if (!professionalsContainer) {
                    console.error('Container for professionals not found.');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch('http://localhost:3000/api/post/all', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch professionals: ".concat(response.statusText));
                }
                return [4 /*yield*/, response.json()];
            case 3:
                professionals_1 = _a.sent();
                if (!Array.isArray(professionals_1)) {
                    console.error('Invalid response format: Expected an array of professionals.');
                    return [2 /*return*/];
                }
                // Render all professionals initially
                renderProfessionals(professionals_1);
                // Event listener for search form input
                searchForm.addEventListener('submit', function (event) {
                    event.preventDefault(); // Prevent form submission
                    var query = searchInput.value.trim().toLowerCase();
                    // Filter professionals based on the profession starting with the search letter
                    var filteredProfessionals = professionals_1.filter(function (professional) {
                        return professional.profession.toLowerCase().startsWith(query);
                    });
                    // Render filtered professionals
                    renderProfessionals(filteredProfessionals);
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Error fetching professionals:', error_1);
                professionalsContainer.innerHTML = "<p class=\"text-center text-danger\">Failed to load professionals. Please try again later.</p>";
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
