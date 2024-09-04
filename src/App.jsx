import React, { useState } from "react";
import "./App.css";

const riskControlledByOptions = [
    "3rd Party to BMcD",
    "3rd Party to Client",
    "3rd Party Unrelated",
    "BMcD",
    "Client",
    "Regulatory Authority",
    "Uncontrolled",
];

const riskCategoryOptions = {
    BMcD: [
        "Contracting",
        "Environmental Events",
        "Organization",
        "Performance Related",
        "Pricing / Financial",
        "Schedule Related",
    ],
    Client: [
        "Claims / Litigation",
        "Contracting",
        "Environmental Events",
        "Organization",
        "Performance Related",
        "Pricing / Financial",
        "Schedule Related",
    ],
    "3rd Party to BMcD": [
        "Claims / Litigation",
        "Contracting",
        "Organization",
        "Performance Related",
        "Pricing / Financial",
        "Schedule Related",
    ],
    "3rd Party to Client": [
        "Claims / Litigation",
        "Contracting",
        "Environmental Events",
        "Organization",
        "Performance Related",
        "Pricing / Financial",
        "Schedule Related",
    ],
    "3rd Party Unrelated": ["Claims / Litigation", "Performance Related"],
    "Regulatory Authority": [
        "Claims / Litigation",
        "Performance Related",
        "Schedule Related",
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
            "Planned Deferred Scope Award",
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
            "Fail to cooperate with us",
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
        "Claims / Litigation": ["File claim/suit/lien"],
    },
    "3rd Party to BMcD": {
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
            "Fail to cooperate with us",
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
        const textArea = document.createElement("textarea");
        textArea.value = event.target.value;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
    };

    return (
        <div className="App">
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
                <div className="instructions">
                    The BMcD Corporate Risk Group will utilize Procore Change
                    Event data for risk analysis and future project evaluations.
                    You are the first line of defense against bad data that
                    could mislead and disrupt our business.
                    <br></br>
                    <br></br>
                    This Procore side panel will help guide you through an
                    accurate Risk Event selection for each Procore Change Event
                    ensuring consistent and valuable data.
                    <br></br>
                    <br></br>
                    <a>Quick Guide Video</a>
                    <br></br>
                    <br></br>
                    In the ‘Selector’ tab of the side-panel:{" "}
                    <ol>
                        <li>
                            From top to bottom, make selections in each of the
                            three dropdowns.
                        </li>
                        <li>
                            After making all guided selections in this
                            side-panel, input the selections into the
                            corresponding Risk fields of the Change Event
                            screen.
                        </li>
                    </ol>
                    <br></br>
                    Links to more information:
                    <ul>
                        <li>
                            <a
                                href="https://burnsmcd.sharepoint.com/:x:/r/sites/maccentral-Risk/_layouts/15/Doc.aspx?sourcedoc=%7B2B42B0F6-5E75-4FBF-B7FA-19F8EB9149DF%7D&file=Risk%20Register%20Template%20Rev%2020240404.xlsx&action=view&mobileredirect=true&activeCell='Risk%20Events%20List'!A1&ovuser=bfbb9a2b-6d99-4e78-b3c7-95005d555c8b,mlmarkovetz@burnsmcd.com&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNDA0MTEyMjMxNSIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ=="
                                target="_blank"
                            >
                                All Risk Events – Categorized
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://burnsmcd.csod.com/samldefault.aspx?ouid=1&returnurl=/ui/lms-learning-details/app/video/fdd61d4a-e190-4978-aa7b-b2a6abde0bf4"
                                target="_blank"
                            >
                                Corporate Risk Review Process Overview Video
                                (Learning Central)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://burnsmcd.sharepoint.com/sites/maccentral-risk"
                                target="_blank"
                            >
                                Risk Management MacCentral Resource Page
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
