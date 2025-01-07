const levels = [
  {
    category: "Cardiovascular Drugs",
    classes: [
      {
        class: "Thiazide Diuretics",
        description:
          "Thiazide diuretics make you pee more, which reduces the amount of fluid in your body. Less fluid means less strain on your heart, which helps lower blood pressure.",
        drugs: [
          { generic: "Chlorthalidone", brand: "Hygroton" },
          { generic: "Hydrochlorothiazide", brand: "Microzide" },
          { generic: "Hydrochlorothiazide/Triamterene", brand: "Maxzide" },
        ],
      },
      {
        class: "ACE Inhibitors",
        description:
          "ACE inhibitors block the enzyme that causes blood vessels to constrict, which helps lower blood pressure.",
        drugs: [
          { generic: "Benazepril", brand: "Lotensin" },
          { generic: "Enalapril", brand: "Vasotec" },
          { generic: "Lisinopril", brand: "Prinivil" },
          { generic: "Ramipril", brand: "Altace" },
          { generic: "Lisinopril/HCTZ", brand: "Prinizide" },
        ],
      },
      {
        class: "ARBs",
        description:
          "ARBs block the receptor that causes blood vessels to constrict, which helps lower blood pressure.",
        drugs: [
          { generic: "Irbesartan", brand: "Avapro" },
          { generic: "Losartan", brand: "Cozaar" },
          { generic: "Losartan/HCTZ", brand: "Hyzaar" },
          { generic: "Valsartan", brand: "Diovan" },
          { generic: "Valsartan/HCTZ", brand: "Diovan HCT" },
        ],
      },
      {
        class: "Beta Blockers",
        description:
          "Beta blockers block the effects of adrenaline, which helps lower blood pressure.",
        drugs: [
          { generic: "Atenolol", brand: "Tenormin" },
          { generic: "Metoprolol", brand: "Lopressor" },
          { generic: "Carvedilol", brand: "Coreg" },
          { generic: "Propranolol", brand: "Inderal" },
          { generic: "Nebivolol", brand: "Bystolic" },
        ],
      },
      {
        class: "Calcium Channel Blockers (Dihydropyridine Type)",
        description:
          "Calcium channel blockers relax blood vessels, which helps lower blood pressure.",
        drugs: [
          { generic: "Amlodipine", brand: "Norvasc" },
          { generic: "Amlodipine/Benazepril", brand: "Lotrel" },
          { generic: "Nifedipine", brand: "Procardia" },
        ],
      },
      {
        class: "Calcium Channel Blockers (Non-Dihydropyridine Type)",
        description:
          "Calcium channel blockers relax blood vessels and slow the heart rate, which helps lower blood pressure.",
        drugs: [
          { generic: "Diltiazem", brand: "Cardizem" },
          { generic: "Verapamil", brand: "Calan" },
        ],
      },
      {
        class: "Alpha Blockers",
        description:
          "Alpha blockers relax blood vessels, which helps lower blood pressure.",
        drugs: [
          { generic: "Doxazosin", brand: "Cardura" },
          { generic: "Tamsulosin", brand: "Flomax" },
          { generic: "Terazosin", brand: "Hytrin" },
        ],
      },
      {
        class: "Alpha-2 Agonists",
        description:
          "Alpha-2 agonists reduce nerve impulses that tighten blood vessels, which helps lower blood pressure.",
        drugs: [
          { generic: "Clonidine", brand: "Catapres" },
          { generic: "Guanfacine", brand: "Intuniv" },
        ],
      },
      {
        class: "Vasodilators",
        description: "Vasodilators relax blood vessels, which helps lower blood pressure.",
        drugs: [
          { generic: "Hydralazine", brand: "Apresoline" },
          { generic: "Nitroglycerin", brand: "Nitrostat" },
          { generic: "Isosorbide Mononitrate", brand: "Imdur" },
        ],
      },
      {
        class: "Other Diuretics",
        description: "Diuretics make you pee more, which helps lower blood pressure.",
        drugs: [
          { generic: "Furosemide", brand: "Lasix" },
        ],
      },
      {
        class: "Potassium-Sparing Diuretics",
        description:
          "Potassium-sparing diuretics make you pee more without losing potassium, which helps lower blood pressure.",
        drugs: [
          { generic: "Spironolactone", brand: "Aldactone" },
        ],
      },
      {
        class: "Antiarrhythmics",
        description: "Antiarrhythmics help control irregular heartbeats.",
        drugs: [
            { "generic": "Amiodarone", "brand": "Cordarone" },
        ],
      },
      {
        class: "Cardiac Glycosides",
        description: "Cardiac glycosides help control heart rate.",
        drugs: [
            { "generic": "Digoxin", "brand": "Lanoxin" },
        ],
      }
    ],
  },
  {
    category: "Antibiotics",
    classes: [
      {
        class: "Penicillins",
        description:
          "Penicillins are a group of antibiotics used to treat bacterial infections.",
        drugs: [
          { generic: "Amoxicillin", brand: "Amoxil" },
          { generic: "Ampicillin", brand: "Principen" },
        ],
      },
    ],
  },
];

export default levels;
