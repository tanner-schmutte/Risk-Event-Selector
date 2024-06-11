import React, { useState } from "react";
import "./App.css";

const riskControlledByOptions = [
    "BMcD",
    "Client",
    "3rd Party to Us",
    "3rd Party to Client",
    "3rd Party Unrelated",
    "Regulatory Authority",
    "Uncontrolled",
];

const riskCategoryOptions = {
    BMcD: [
        "Schedule Related",
        "Performance Related",
        "Environmental Events",
        "Pricing / Financial",
        "Contracting",
    ],
    Client: [
        "Organization",
        "Schedule Related",
        "Performance Related",
        "Environmental Events",
        "Pricing / Financial",
        "Contracting",
        "Claims / Litigation",
    ],
    "3rd Party to Us": [
        "Organization",
        "Schedule Related",
        "Performance Related",
        "Pricing / Financial",
        "Contracting",
        "Claims / Litigation",
    ],
    "3rd Party to Client": [
        "Organization",
        "Schedule Related",
        "Performance Related",
        "Environmental Events",
        "Pricing / Financial",
        "Contracting",
        "Claims / Litigation",
    ],
    "3rd Party Unrelated": ["Performance Related", "Claims / Litigation"],
    "Regulatory Authority": [
        "Schedule Related",
        "Performance Related",
        "Claims / Litigation",
    ],
    Uncontrolled: [
        "Environmental Events",
        "Political Events",
        "Pricing / Financial",
    ],
};

const riskEventOptions = {
    BMcD: {
        Organization: ["Change key leader/manager"],
        "Schedule Related": [
            "Change project sequence",
            "Deliver goods/work product after due date",
            "Underestimate time required to perform work",
        ],
        "Performance Related": [
            "Design misjudgment, miscalculation, misinterpretation or oversight",
            "Fail to cooperate with others",
            "Don't maintain all or portions of project",
            "Execute less efficiently than planned (poor productivity)",
            "Improperly startup/operate machines/equipment",
            "Interfere with activities of others",
            "Miscommunicate/misunderstand important information",
            "Safety accident/incident",
            "Used wrong construction tools, materials, means, methods; inaccurately measured dimensions; or deviated from requirements",
            "Violate rule, regulation or law (non-compliance)",
            "Misjudge important circumstances/events",
        ],
        "Environmental Events": ["Unplanned discharge of hazardous materials"],
        "Pricing / Financial": [
            "Don't pay invoice",
            "Don't properly pay invoice",
            "Don't properly pay taxes",
            "Overbill client",
            "Overprice bid",
            "Underbid project",
        ],
        Contracting: [
            "Don't pursue change order",
            "Inadvertently waive claims/rights",
            "Proceed without written agreement",
            "Refuse to enter contract",
            "Refuse/fail to perform contract requirements",
        ],
    },
    Client: {
        Organization: ["Change key leader/manager"],
        "Schedule Related": [
            "Change award schedule",
            "Change project scope",
            "Change start/completion date",
            "Decide/deliver decision after due date",
            "Re-bid project due to change in circumstances/plans",
            "Suspend/stop work",
        ],
        "Performance Related": [
            "Fail cooperate with us",
            "Fail to grant permit / late permit issuance",
            "Improperly startup/operate machines/equipment",
            "Incomplete or insufficient decision making",
            "Interfere with activities of others",
            "Miscommunicate/misunderstand important information",
            "Safety accident/incident",
            "Unplanned discharge of hazardous materials",
            "Violate rule, regulation or law (non-compliance)",
        ],
        "Environmental Events": ["Unplanned discharge of hazardous materials"],
        "Pricing / Financial": [
            "Become insolvent/file bankruptcy",
            "Don't pay invoice",
            "Don't properly pay/withhold invoice",
            "Stop/cut off funding for project",
        ],
        Contracting: [
            "Award project to BMcD competitor",
            "Fail/refuse to perform contract requirements (breach contract)",
        ],
        "Claims / Litigation": ["File claim/suit"],
    },
    "3rd Party to Us": {
        Organization: ["Change key leader/manager", "Labor unrest"],
        "Schedule Related": [
            "Change project sequence",
            "Change start/completion date",
            "Deliver goods/work product after due date",
            "Deliver goods/work product prior to due date",
        ],
        "Performance Related": [
            "Design misjudgment, miscalculation, misinterpretation or oversight",
            "Fail to cooperate with us",
            "Don't obtain or fail to maintain proper insurance",
            "Execute less efficiently than planned (poor productivity)",
            "Improper/incorrect goods manufacture or maintenance",
            "Improperly startup/operate machines/equipment",
            "Interfere with activities of others",
            "Miscommunicate/misunderstand important information",
            "Poorly plan/organize/track progress for proper and efficient execution",
            "Safety accident/incident",
            "Unplanned discharge of hazardous materials",
            "Used wrong construction tools, materials, means, methods; inaccurately measured dimensions; or deviated from requirements",
            "Violate rule, regulation or law (non-compliance)",
        ],
        "Pricing / Financial": [
            "Become insolvent/file bankruptcy",
            "Don't pay invoice",
            "Don't properly pay invoice",
            "Don't properly pay taxes",
            "Overbill us",
            "Overprice bid",
            "Underbid project",
        ],
        Contracting: [
            "Refuse to enter contract",
            "Refuse to perform contract requirements",
            "Proceed without written agreement",
        ],
        "Claims / Litigation": ["File claim/suit/lien"],
    },
    "3rd Party to Client": {
        Organization: ["Change key leader/manager", "Labor unrest"],
        "Schedule Related": [
            "Change project sequence",
            "Change start/completion date",
            "Deliver goods/work product after due date",
            "Deliver goods/work product prior to due date",
        ],
        "Performance Related": [
            "Design misjudgment, miscalculation, misinterpretation or oversight",
            "Fail cooperate with us",
            "Execute less efficiently than planned (poor productivity)",
            "Improperly startup/operate machines/equipment",
            "Interfere with activities of others",
            "Miscommunicate/misunderstand important information",
            "Improper/incorrect goods manufacture or maintenance",
            "Safety accident/incident",
            "Used wrong construction tools, materials, means, methods; inaccurately measured dimensions; or deviated from requirements",
            "Poorly plan/organize/track progress for proper and efficient execution",
        ],
        "Environmental Events": ["Unplanned discharge of hazardous materials"],
        "Pricing / Financial": [
            "Become insolvent/file bankruptcy",
            "Don't pay invoice/pay invoice late",
            "Stop/cut off funding for project",
        ],
        Contracting: [
            "Protest project to force re-bid",
            "Refuse to perform contract requirements",
        ],
        "Claims / Litigation": ["File claim/suit/lien"],
    },
    "3rd Party Unrelated": {
        "Performance Related": [
            "Interfere with activities of others",
            "Cybersecurity breach",
        ],
        "Claims / Litigation": ["File claim/suit/lien"],
    },
    "Regulatory Authority": {
        "Schedule Related": ["Suspend/stop work"],
        "Performance Related": [
            "Change in code, regulation or law",
            "Grant permit late or don't grant permit",
            "Interfere with activities of others",
        ],
        "Claims / Litigation": ["File claim/suit/lien"],
    },
    Uncontrolled: {
        "Environmental Events": [
            "Force Majeure",
            "Inclement Weather",
            "Discover unforeseen conditions",
        ],
        "Political Events": [
            "Change in code, regulation or law",
            "Fail to grant permit / late permit issuance",
        ],
        "Pricing / Financial": [
            "Price escalation",
            "Commodity/goods price increase",
            "Labor price increase",
            "Currency fluctuation",
            "Interest rate change",
        ],
    },
};

function App() {
    const [selectedTab, setSelectedTab] = useState("Selector");
    const [selectedRiskControlledBy, setSelectedRiskControlledBy] =
        useState("");
    const [selectedRiskCategory, setSelectedRiskCategory] = useState("");
    const [selectedRiskEvent, setSelectedRiskEvent] = useState("");
    const [isRiskControlledByOpen, setIsRiskControlledByOpen] = useState(false);
    const [isRiskCategoryOpen, setIsRiskCategoryOpen] = useState(false);
    const [isRiskEventOpen, setIsRiskEventOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleRiskControlledByChange = (event) => {
        setSelectedRiskControlledBy(event.target.value);
        setSelectedRiskCategory("");
        setSelectedRiskEvent("");
        setCopied(false);
    };

    const handleRiskCategoryChange = (event) => {
        setSelectedRiskCategory(event.target.value);
        setSelectedRiskEvent("");
        setCopied(false);
    };

    const handleRiskEventChange = (event) => {
        setSelectedRiskEvent(event.target.value);
        navigator.clipboard.writeText(event.target.value);
        setCopied(true);
    };

    return (
        <div className="App">
            <h2>Risk Event Selector</h2>
            <nav className="nav-bar">
                <button
                    className={`nav-button ${
                        selectedTab === "Selector" ? "active" : ""
                    }`}
                    onClick={() => setSelectedTab("Selector")}
                >
                    <span
                        className={
                            selectedTab === "Selector" ? "underline" : ""
                        }
                    >
                        Selector
                    </span>
                </button>
                <button
                    className={`nav-button ${
                        selectedTab === "Instructions" ? "active" : ""
                    }`}
                    onClick={() => setSelectedTab("Instructions")}
                >
                    <span
                        className={
                            selectedTab === "Instructions" ? "underline" : ""
                        }
                    >
                        Instructions
                    </span>
                </button>
            </nav>
            {selectedTab === "Selector" ? (
                <div className="selector-container">
                    <div className="dropdown-container">
                        <label>
                            Risk Controlled By
                            <div
                                className={`custom-select ${
                                    isRiskControlledByOpen ? "open" : ""
                                }`}
                            >
                                <select
                                    value={selectedRiskControlledBy}
                                    onChange={handleRiskControlledByChange}
                                    onClick={() =>
                                        setIsRiskControlledByOpen(
                                            !isRiskControlledByOpen
                                        )
                                    }
                                    onBlur={() =>
                                        setIsRiskControlledByOpen(false)
                                    }
                                >
                                    <option value="">Select</option>
                                    {riskControlledByOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <span className="arrow"></span>
                            </div>
                        </label>
                    </div>
                    <div className="dropdown-container">
                        <label>
                            Risk Category
                            <div
                                className={`custom-select ${
                                    isRiskCategoryOpen ? "open" : ""
                                }`}
                            >
                                <select
                                    value={selectedRiskCategory}
                                    onChange={handleRiskCategoryChange}
                                    onClick={() =>
                                        setIsRiskCategoryOpen(
                                            !isRiskCategoryOpen
                                        )
                                    }
                                    onBlur={() => setIsRiskCategoryOpen(false)}
                                    disabled={!selectedRiskControlledBy}
                                >
                                    <option value="">Select</option>
                                    {selectedRiskControlledBy &&
                                        riskCategoryOptions[
                                            selectedRiskControlledBy
                                        ].map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                </select>
                                <span className="arrow"></span>
                            </div>
                        </label>
                    </div>
                    <hr className="separator" />
                    <div className="dropdown-container">
                        <label>
                            Risk Event
                            <div
                                className={`custom-select ${
                                    isRiskEventOpen ? "open" : ""
                                }`}
                            >
                                <select
                                    value={selectedRiskEvent}
                                    onChange={handleRiskEventChange}
                                    onClick={() =>
                                        setIsRiskEventOpen(!isRiskEventOpen)
                                    }
                                    onBlur={() => setIsRiskEventOpen(false)}
                                    disabled={!selectedRiskCategory}
                                >
                                    <option value="">Select</option>
                                    {selectedRiskControlledBy &&
                                        selectedRiskCategory &&
                                        riskEventOptions[
                                            selectedRiskControlledBy
                                        ][selectedRiskCategory].map(
                                            (option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            )
                                        )}
                                </select>
                                <span className="arrow"></span>
                            </div>
                            {copied && (
                                <span className="copied-message">Copied</span>
                            )}
                        </label>
                    </div>
                </div>
            ) : (
                <div className="instructions">Instructions will go here.</div>
            )}
        </div>
    );
}

export default App;
