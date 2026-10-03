/* ERD case data for the worked questions. */
window.ICT450_ERD_CASES = [
  {
    id:"feb23",session:"February 2023",title:"Chanteq Boutique: products, colours and retailers",paper:"../04-exams/repaired/FEB23%20-%20repaired%20derivative.pdf",pages:["assets/february-2023-q5-source.png"],
    intro:"Chanteq Boutique is a local dress manufacturer. It sells its products to major distributors who distribute through their own stores in major cities and shopping malls. The primary product line is a casual dress for women. Chanteq Boutique is in the process of designing a database system. The requirements needed are as following:",
    rules:[
      "Chanteq Boutique manufactures several [[e:products]]. [[a:Product id]] is a unique identifier. [[a:Product name]] is also need to be stored in this system.",
      "Each [[e:product]] has been [[r:assigned]] to a different [[e:stock-keeping unit (SKU)]]. Each SKU [[c:belongs to a specific product]]. [[a:SKU number]] is a unique identifier of SKU. [[a:SKU description]] is also recorded in this table.",
      "Chanteq Boutique has created several unique [[e:colors]] for its dress. Each color is uniquely identified by a [[a:color id]]. A [[a:color description]] will describe the color options (e.g. red, blue, navy). [[c:Each SKU has only one color]]. Some colors have been assigned to SKU or [[c:may never be used]].",
      "Each [[e:retailer]] will have a contract with Chanteq Boutique based on [[e:products]] it will distribute. A retailer will distribute [[c:one or more products]], and a particular product will be distributed by [[c:more than one retailer]]. Each retailer has a unique [[a:id, name and phone number]].",
      "Retailers have [[e:stores]], which is the place where they sell the skirt and other products. [[c:Each retailer has one or more stores]]. To identify a store in the Chanteq Boutique database for shipping purposes, all customers have agreed to provide their [[a:store id and customer id]] as confirmation. They also need to write their [[a:address]]."
    ],taskB:"Briefly explain TWO (2) examples of reports that can be generated from the ERD in (a). (4 marks)",
    nodes:[
      ["PRODUCT","ProductID (PK)|ProductName",0,1],["SKU","SKUNo (PK)|SKUDescription|ProductID (FK)|ColorID (FK)",1,1],["COLOR","ColorID (PK)|ColorDescription",2,1],
      ["RETAILER","RetailerID (PK)|Name|PhoneNumber",0,3],["RETAILER_PRODUCT","RetailerID (PK/FK)|ProductID (PK/FK)",1,3,"bridge"],["STORE","RetailerID (PK/FK)|StoreID (PK)|Address",2,3]
    ],
    edges:[
      ["PRODUCT","SKU","has","1","1"],["COLOR","SKU","colours","1","0many"],["RETAILER","STORE","has","1","many"],
      ["RETAILER","RETAILER_PRODUCT","distributes","1","many"],["PRODUCT","RETAILER_PRODUCT","distributed by","1","many"]
    ],
    direct:["PRODUCT ↔ SKU: each product has exactly one distinct SKU, and every SKU belongs to exactly one product.","COLOR → SKU: one colour may be unused; every SKU has exactly one colour.","RETAILER ↔ PRODUCT: many-to-many distribution contract.","RETAILER → STORE: a retailer has one or more stores."],
    keys:["Use ProductID, SKUNo, ColorID and RetailerID as stated unique identifiers.","STORE uses RetailerID + StoreID as a composite identifier; the paper's ‘customer id’ is interpreted in its retailer/store context."],
    cardinality:["The phrase ‘may never be used’ makes COLOR participation optional (0..many SKUs).","Following ‘each product ... a different SKU’, PRODUCT–SKU is mandatory 1:1 at both ends. ProductID in SKU must be unique as well as a foreign key.","‘One or more’ makes stores and retailer products mandatory on the retailer side; do not infer a single product per retailer."],
    structure:["Resolve RETAILER–PRODUCT with RETAILER_PRODUCT (two foreign keys forming its key).","Enforce the PRODUCT–SKU 1:1 relationship with a unique, non-null ProductID foreign key in SKU; SKU's own SKUNo remains its primary key.","Do not turn Color into a free-text attribute of Product: each SKU chooses exactly one recorded Color."],
    checks:["Every PRODUCT has one distinct SKU; every SKU references one PRODUCT and one COLOR. Make SKU.ProductID unique and non-null; requiring every product to have its SKU also needs a creation/workflow check.","A retailer can stock multiple products, and a product can reach multiple retailers.","A store is identified within its retailer, not globally by StoreID alone."],
    reports:["Retailers and their contracted products, including product names.","Stores and shipping addresses grouped by retailer."]
  },
  {
    id:"jul23",session:"July 2023",title:"Bristledbeast: hikers, trips and guides",paper:"../04-exams/ocr/JULY23%20-%20searchable%20OCR.pdf",pages:["assets/july-2023-q5-source.png"],
    intro:"Bristledbeast is a hiking agency that manages various trips to hike local mountains. They plan to build a database system in order to keep track the organized trips throughout the years. You are hired to design and develop a database system based on the following requirements:",
    rules:[
      "Details of [[e:hikers]] need to be recorded in the system: [[a:hiker identification number, full name, address, phone number, email]].",
      "Each hiker also needs to give details of any [[e:family member]]. They need to give their family member's [[a:full name, emergency contact number, address and email]].",
      "For each [[e:trip]], the [[a:trip ID, trip name, approximate length (in hours), and fees charged]] are recorded in this table.",
      "Each [[e:hiker]] [[c:can join many]] [[e:trips]]. [[a:Start date of hike and end date of hike]] are also need to be recorded in this system.",
      "Each trip is [[c:managed by at least one]] [[e:guide]]. Some guides have been assigned to several trips or [[c:may not assign to any trip]]. [[a:Payment for each assigned trip]] is recorded in this system. Guides are identified by an [[a:employee ID]]. [[a:Guide full name, contact number, address, hire date]] are also recorded in this system.",
      "Each trip will have [[c:one destination]] of [[e:mountain]]. The details of mountain such as [[a:mountain name, height and country]] are also need to be stored in this system."
    ],taskB:"Briefly explain TWO (2) examples of reports that can be generated from the ERD in (a). (4 marks)",
    nodes:[
      ["HIKER","HikerID (PK)|FullName|Address|Phone|Email",0,1],["FAMILY_MEMBER","FamilyMemberID (PK)*|HikerID (FK)|FullName|EmergencyPhone|Address|Email",0,3],
      ["HIKER_TRIP","HikerID (PK/FK)|TripID (PK/FK)|HikeStartDate|HikeEndDate",1,1,"bridge"],["TRIP","TripID (PK)|TripName|LengthHours|Fees|MountainID (FK)",2,1],
      ["TRIP_GUIDE","TripID (PK/FK)|EmployeeID (PK/FK)|Payment",3,1,"bridge"],["GUIDE","EmployeeID (PK)|FullName|ContactNo|Address|HireDate",4,1],
      ["MOUNTAIN","MountainID (PK)*|MountainName|Height|Country",2,3]
    ],
    edges:[["HIKER","FAMILY_MEMBER","contact","1","0many"],["HIKER","HIKER_TRIP","joins","1","0many"],["TRIP","HIKER_TRIP","joined on","1","0many"],["TRIP","TRIP_GUIDE","managed on","1","many"],["GUIDE","TRIP_GUIDE","assigned to","1","0many"],["MOUNTAIN","TRIP","destination","1","0many"]],
    direct:["HIKER → FAMILY_MEMBER: one hiker can list family contacts.","HIKER ↔ TRIP: many-to-many participation, with dates for each joining.","TRIP ↔ GUIDE: many-to-many assignment, with payment per assignment.","MOUNTAIN → TRIP: each trip has one mountain destination."],
    keys:["HikerID, TripID and EmployeeID are given identifiers.","The paper names no key for a family member or mountain; FamilyMemberID and MountainID are proposed design identifiers, not source facts."],
    cardinality:["‘At least one guide’ means each trip requires one or more guide assignments.","‘May not assign to any trip’ allows a guide to have zero assignments.","A mountain can be a destination for zero or more trips; every trip has one mountain."],
    structure:["HIKER_TRIP stores hike start/end dates because those dates describe a particular hiker on a particular trip.","TRIP_GUIDE stores Payment because it describes the guide's assignment to that trip."],
    checks:["Do not attach HikeStartDate to HIKER or TRIP alone.","Do not attach Payment to GUIDE alone.","Check that the minimum of one guide per trip is enforced by a business rule or application logic; the foreign keys alone do not guarantee it."],
    reports:["Trips and guide assignments with the payment for each guide.","Hikers registered for each trip, including hike dates."]
  },
  {
    id:"jan24",session:"January 2024",title:"Auxiliary police: duties and summons",paper:"../04-exams/ocr/JAN24%20-%20searchable%20OCR.pdf",pages:["assets/january-2024-q5-source.png"],
    intro:"One public university in Arau, Perlis is planning to develop an auxiliary police database system for a better coordination and reporting of summons and security duties. As a database designer, you are tasked to design the database system according to the following requirements:",
    rules:[
      "Details of each [[e:police officer]] such as their [[a:Police ID, name, position and email address]].",
      "Each police officer has been [[r:assigned]] to [[c:five main duties]]. For safety reasons, [[c:each duty will be carried out by more than one police officer]]. The [[a:date and time of each assigned duty]] need to be recorded in the system.",
      "Each police officer also [[c:can issue]] [[e:summons]] to several [[e:students]]. The [[a:date of summon issuance]] need to be recorded by the police officer.",
      "A summon will be issued if a student violates any rules and regulations.",
      "[[c:Each summon will consist more than one]] [[e:offense]]. [[a:Offense ID, offense name, description, and rate of fees]] need to be recorded in the system."
    ],taskB:"Identify TWO (2) relevant information that you can get from the ERD in (a). (4 marks)",
    nodes:[
      ["DUTY","DutyID (PK)*|DutyName*",0,1],["OFFICER_DUTY","PoliceID (PK/FK)|DutyID (PK/FK)|DutyDate (PK)*|DutyTime (PK)*",1,1,"bridge"],
      ["POLICE_OFFICER","PoliceID (PK)|Name|Position|Email",2,1],["SUMMON","SummonID (PK)*|PoliceID (FK)|StudentID (FK)|IssueDate",3,1],
      ["STUDENT","StudentID (PK)*",4,1],["SUMMON_OFFENSE","SummonID (PK/FK)|OffenseID (PK/FK)",3,3,"bridge"],["OFFENSE","OffenseID (PK)|OffenseName|Description|FeeRate",4,3]
    ],
    edges:[["DUTY","OFFICER_DUTY","scheduled","1","many"],["POLICE_OFFICER","OFFICER_DUTY","assigned","1","many"],["POLICE_OFFICER","SUMMON","issues","1","0many"],["STUDENT","SUMMON","receives","1","0many"],["SUMMON","SUMMON_OFFENSE","contains","1","many"],["OFFENSE","SUMMON_OFFENSE","listed in","1","0many"]],
    direct:["POLICE_OFFICER ↔ DUTY: many-to-many assignment with date and time.","POLICE_OFFICER → SUMMON: one officer may issue multiple summons.","STUDENT → SUMMON: one student may receive multiple summons.","SUMMON ↔ OFFENSE: a summon lists multiple offenses, and an offense type can occur in multiple summons."],
    keys:["PoliceID and OffenseID are supplied identifiers.","DutyID, SummonID and StudentID are proposed identifiers because the paper does not supply them.","DutyDate and DutyTime are included in the assignment key here to distinguish repeated allocations of the same officer and duty."],
    cardinality:["‘More than one police officer’ is a minimum of two officers per duty, a stronger business constraint than ordinary 1..many Crow's Foot notation can express.","‘Each police officer ... assigned to five main duties’ can require exactly five duty assignments per officer; Crow's Foot 1..many does not encode exactly five, and the paper does not give the duty names.","A summon contains more than one offense, another minimum-of-two constraint requiring a note beyond the diagram."],
    structure:["OFFICER_DUTY carries the assignment date and time.","SUMMON_OFFENSE resolves the repeated offense types in summons."],
    checks:["Keep issue date with SUMMON, not with STUDENT.","Show both the issuing officer and recipient student for each summon.","Document the >1-officer-per-duty and >1-offense-per-summon minimums separately."],
    reports:["Duty allocations by date, time and officer.","Student summons with offenses and associated fee rates."]
  },
  {
    id:"jul24",session:"July 2024",title:"S2 football: tournaments and matches",paper:"../04-exams/official/JULY24.pdf",pages:["assets/july-2024-q5-source.png"],
    intro:"S2 football club plans to develop a database management system to facilitate the organization and administration of football tournaments at various levels. The system will be used to manage tournament fixtures, teams, players, match results, and venue information. As a database designer, you have been hired by S2 football club to design the database system according to the following requirements:",
    rules:[
      "[[e:Tournaments]] store details of a [[a:tournament ID, tournament name, start date, end date, and organizer information]].",
      "[[e:Team]] refers to football teams who [[r:participate in tournaments]] which include data about [[a:team id, team name and coach name]].",
      "[[e:Player]] represents individual football players. Players' details include [[a:player id, player name, date of birth, nationality, and position]]. [[c:One player can join only one team]].",
      "[[e:Fixture]] records the whole schedule of match to be played in the tournament. It includes the [[a:fixture ID, kick-off time and tournament ID]].",
      "[[e:Match]] contains information about individual matches which include data for [[a:match id, match date, home team ID, away team ID, result and venue]].",
      "[[e:Venue]] stores details of selected venues for each matches including [[a:venue id, venue name, location, and seating capacity]].",
      "A tournament [[c:can have multiple fixtures]], but [[c:each fixture belongs to only one tournament]].",
      "A team [[c:can have multiple players]], but [[c:each player belongs to only one team]].",
      "[[c:Each fixture consists of multiple matches]], but [[c:each match is associated with only one fixture]]."
    ],taskB:"Identify FOUR (4) relevant information that you can get from the ERD in (a). (4 marks)",
    nodes:[
      ["TOURNAMENT","TournamentID (PK)|TournamentName|StartDate|EndDate|Organizer",0,1],["TOURNAMENT_TEAM","TournamentID (PK/FK)|TeamID (PK/FK)",1,1,"bridge"],
      ["TEAM","TeamID (PK)|TeamName|CoachName",2,1],["PLAYER","PlayerID (PK)|PlayerName|DOB|Nationality|Position|TeamID (FK)",3,1],
      ["FIXTURE","FixtureID (PK)|KickOffTime|TournamentID (FK)",0,3],["MATCH","MatchID (PK)|MatchDate|Result|HomeTeamID (FK)|AwayTeamID (FK)|FixtureID (FK)|VenueID (FK)",2,3],
      ["VENUE","VenueID (PK)|VenueName|Location|Capacity",4,3]
    ],
    edges:[["TOURNAMENT","TOURNAMENT_TEAM","includes","1","0many"],["TEAM","TOURNAMENT_TEAM","participates","1","0many"],["TEAM","PLAYER","has","1","0many"],["TOURNAMENT","FIXTURE","schedules","1","0many"],["FIXTURE","MATCH","contains","1","many"],["VENUE","MATCH","hosts","1","0many"],["TEAM","MATCH","home team","1","0many"],["TEAM","MATCH","away team","1","0many"]],
    direct:["TOURNAMENT ↔ TEAM: teams participate in tournaments; a bridge records each participation.","TEAM → PLAYER: each player belongs to one team.","TOURNAMENT → FIXTURE → MATCH: each match is assigned to one fixture in one tournament.","VENUE → MATCH: each match uses one venue.","TEAM → MATCH has distinct home and away roles."],
    keys:["The question supplies identifiers for Tournament, Team, Player, Fixture, Match and Venue.","TOURNAMENT_TEAM uses both parent keys as its composite identifier."],
    cardinality:["‘Each player belongs to only one team’ makes TeamID mandatory in PLAYER.","‘Each fixture consists of multiple matches’ requires at least one match per fixture; the diagram's 1..many does not express a minimum greater than one.","No rule says a team may appear as both home and away in the same match; keep those two foreign-key roles distinct."],
    structure:["TOURNAMENT_TEAM resolves tournament participation.","MATCH has two separate references to TEAM: HomeTeamID and AwayTeamID. They are not a single merged relationship."],
    checks:["Do not connect PLAYER directly to TOURNAMENT unless a separate registration rule is given.","Do not collapse FIXTURE and MATCH into one table: the paper explicitly distinguishes them.","Record the two team roles on MATCH and one venue for each match."],
    reports:["Match schedule by tournament and fixture.","Players grouped by team.","Match results with home/away teams.","Venues and scheduled matches."]
  },
  {
    id:"feb25",session:"February 2025",title:"Excellent Art: studios, programmes and staff",paper:"../04-exams/repaired/FEB25%20-%20repaired%20derivative.pdf",pages:["assets/february-2025-q5-source.png"],
    intro:"Excellent Art is a company that provides art training for children interested in it. The company mission is to promote creative and innovative thinking in children's life.",
    rules:[
      "There are about 15 Excellent Art [[e:studios]] around Malaysia. To uniquely identify each art studio, they had been assigned with a unique [[a:studio id]]. Other important information are [[a:studio name, address, phone number, email, and GPS coordinate]].",
      "Each studio [[r:deals with]] many [[e:suppliers]], which [[r:supply]] a variety of [[e:art materials]]. Art material information: [[a:art material id, name, description, and price]]. Supplier information: unique [[a:id, name, address, and email]].",
      "One art studio [[c:provides many]] [[e:programs]]. Each program has [[a:program id, name, description, and price]]. The programs are classified as [[e:Visual Art]], [[e:Glass Painting]] and [[e:Handicraft]]. Visual Art has [[a:class type]], Glass Painting [[a:program level (1 to 5)]], and Handicraft [[a:craft data]].",
      "There are about 100 [[e:employees]]. Each employee has a unique [[a:employee number, first name, last name, job title and date of birth]] and is allocated to [[c:only one art studio]]. Each studio has several employees; each employee can work in one studio.",
      "If an employee is currently [[r:married to another employee of the same studio]], the [[a:spouse's employee number and date of marriage]] is recorded.",
      "Many employees in the studio [[r:acquire]] many [[e:skills]]. Skills data are [[a:skill type and skill description]]."
    ],taskB:"List TWO (2) examples of reports that can be produced from this database system. (4 marks)",
    nodes:[
      ["STUDIO","StudioID (PK)|StudioName|Address|Phone|Email|GPS",0,1],["STUDIO_SUPPLIER","StudioID (PK/FK)|SupplierID (PK/FK)",1,1,"bridge"],
      ["SUPPLIER","SupplierID (PK)|Name|Address|Email",2,1],["SUPPLIER_MATERIAL","SupplierID (PK/FK)|ArtMaterialID (PK/FK)",3,1,"bridge"],["ART_MATERIAL","ArtMaterialID (PK)|Name|Description|Price",4,1],
      ["PROGRAM","ProgramID (PK)|StudioID (FK)|Name|Description|Price|ProgramType",0,3],["VISUAL_ART","ProgramID (PK/FK)|ClassType",0,5,"subtype"],
      ["GLASS_PAINTING","ProgramID (PK/FK)|ProgramLevel (1–5)",1,5,"subtype"],["HANDICRAFT","ProgramID (PK/FK)|CraftData",2,5,"subtype"],
      ["EMPLOYEE","EmployeeNo (PK)|StudioID (FK)|FirstName|LastName|JobTitle|DOB",2,3],["EMPLOYEE_SKILL","EmployeeNo (PK/FK)|SkillID (PK/FK)",3,3,"bridge"],
      ["SKILL","SkillID (PK)*|SkillType|Description",4,3],["EMPLOYEE_MARRIAGE","EmployeeNo (PK/FK)|SpouseEmployeeNo (FK)|DateOfMarriage",3,5,"association"]
    ],
    edges:[["STUDIO","STUDIO_SUPPLIER","deals with","1","many"],["SUPPLIER","STUDIO_SUPPLIER","supplies","1","0many"],["SUPPLIER","SUPPLIER_MATERIAL","supplies","1","many"],["ART_MATERIAL","SUPPLIER_MATERIAL","provided by","1","0many"],["STUDIO","PROGRAM","offers","1","many"],["STUDIO","EMPLOYEE","employs","1","many"],["PROGRAM","VISUAL_ART","type","1","0one"],["PROGRAM","GLASS_PAINTING","type","1","0one"],["PROGRAM","HANDICRAFT","type","1","0one"],["EMPLOYEE","EMPLOYEE_SKILL","acquires","1","0many"],["SKILL","EMPLOYEE_SKILL","held by","1","0many"],["EMPLOYEE","EMPLOYEE_MARRIAGE","employee","1","0one"],["EMPLOYEE","EMPLOYEE_MARRIAGE","spouse","1","0one"]],
    direct:["STUDIO ↔ SUPPLIER ↔ ART_MATERIAL contains two distinct many-to-many relationships.","STUDIO → PROGRAM and STUDIO → EMPLOYEE are one-to-many.","PROGRAM has three disjoint programme types.","EMPLOYEE ↔ SKILL is many-to-many; EMPLOYEE ↔ EMPLOYEE is an optional spouse relationship."],
    keys:["StudioID, SupplierID, ArtMaterialID, ProgramID and EmployeeNo are stated unique identifiers.","SkillID is proposed: the paper gives skill type and description but no identifier."],
    cardinality:["An employee works in only one studio; each studio has several employees.","A spouse relationship is optional and at most one current spouse per employee, restricted to the same studio.","Each programme belongs to exactly one of the three listed specialisations (total, disjoint classification in the corrected model)."],
    structure:["Resolve studio-supplier, supplier-material, and employee-skill with distinct associative entities.","Use PROGRAM as a supertype and VISUAL_ART, GLASS_PAINTING, HANDICRAFT as subtypes; validate Glass Painting level 1–5.","EMPLOYEE_MARRIAGE records the recursive association and DateOfMarriage; prevent duplicate reverse pairs."],
    checks:["Do not connect STUDIO directly to ART_MATERIAL without its supplier context.","Every subtype inherits one ProgramID; a programme must be in exactly one subtype.","The spouse must be another employee in the same studio."],
    reports:["Programmes and prices offered by each studio.","Employee skills grouped by studio."]
  },
  {
    id:"jul25",session:"July 2025",title:"Clean Environment: waste collection duties",paper:"../04-exams/official/JULY25.pdf",pages:["assets/july-2025-q5-source-1.png","assets/july-2025-q5-source-2.png"],
    intro:"Clean Environment Sdn. Bhd. is a new company in Jasin, Malacca. It is developing a solid-waste recycling database system for monitoring, collection and disposal of waste from each locality. The requirements are:",
    rules:[
      "Record details of the [[e:collector]]: [[a:collector ID, name, and phone number]].",
      "Among the collectors, several are [[e:supervisors]]. [[c:Each collector is managed by one supervisor]], and [[c:each supervisor manages many collectors]].",
      "[[c:Each collector is assigned to several]] [[e:collection duties]]. [[c:Each duty involves only one collector]]. The [[a:collection date]] is recorded.",
      "Each collection duty session is for [[c:one]] [[e:locality]] and uses [[c:one]] [[e:vehicle]].",
      "Locality details: [[a:locality ID, locality name, and postcode]].",
      "Vehicle details: [[a:plate number, model, and size]].",
      "[[c:Each locality contains several]] [[e:houses]], and [[c:each house is located in one locality]]. The [[a:address and category]] of each house are recorded.",
      "Each collection duty session [[r:collects]] various types of [[e:solid waste]].",
      "Each piece of solid waste has an [[a:ID, name, and category]].",
      "The [[a:total weight]] of the collected solid waste is also recorded."
    ],taskB:"Identify TWO (2) relevant information that you can get from the ERD in (a). (4 marks)",
    nodes:[
      ["COLLECTOR","CollectorID (PK)|Name|Phone|SupervisorID (FK)",0,1],["COLLECTION_DUTY","DutyID (PK)*|CollectorID (FK)|LocalityID (FK)|PlateNo (FK)|CollectionDate",1,1],
      ["LOCALITY","LocalityID (PK)|LocalityName|Postcode",2,1],["HOUSE","HouseID (PK)*|LocalityID (FK)|Address|Category",3,1],
      ["VEHICLE","PlateNo (PK)|Model|Size",1,3],["DUTY_WASTE","DutyID (PK/FK)|WasteID (PK/FK)|TotalWeight",2,3,"bridge"],["SOLID_WASTE","WasteID (PK)|Name|Category",3,3]
    ],
    edges:[["COLLECTOR","COLLECTOR","supervises","0one","0many"],["COLLECTOR","COLLECTION_DUTY","assigned","1","many"],["LOCALITY","COLLECTION_DUTY","served","1","0many"],["VEHICLE","COLLECTION_DUTY","used","1","0many"],["LOCALITY","HOUSE","contains","1","many"],["COLLECTION_DUTY","DUTY_WASTE","collects","1","many"],["SOLID_WASTE","DUTY_WASTE","type","1","0many"]],
    direct:["COLLECTOR → COLLECTOR: one supervisor manages several collectors; this is a recursive relationship.","COLLECTOR → COLLECTION_DUTY: each duty has one collector.","LOCALITY and VEHICLE each connect to a duty; a locality also has many houses.","COLLECTION_DUTY ↔ SOLID_WASTE: many-to-many collection record with weight."],
    keys:["CollectorID, LocalityID, PlateNo and WasteID are stated identifiers.","DutyID and HouseID are proposed because the paper gives no identifiers for duties or houses."],
    cardinality:["The top-level supervisor has no supervisor; every other collector has exactly one. The recursive endpoint is therefore 0..1 supervisor per collector.","‘Various types of solid waste’ suggests more than one waste type per duty; a 1..many endpoint cannot express a minimum of two.","Each duty uses one vehicle and serves one locality; one vehicle or locality may appear in many duties.","Each house belongs to one locality."],
    structure:["SupervisorID is a self-reference to COLLECTOR; it is empty only for the designated top-level supervisor. Prevent cycles and require one supervisor for every other collector.","DUTY_WASTE resolves the many-to-many relationship and holds TotalWeight, which is specific to one waste type on one duty."],
    checks:["Do not store TotalWeight on SOLID_WASTE; it changes per duty.","Permit no SupervisorID only for the designated top-level supervisor; all other collectors have one, and supervision must be acyclic.","Each duty has a collector, locality, vehicle, date and waste-type records; ‘various types’ may require more than one waste type per duty beyond what 1..many notation expresses."],
    reports:["Total collected weight by locality and waste type.","Collection duties by collector, vehicle and date."]
  }
];

/* Each row traces a visible source clue through a question to a modelling decision.
   Stages 3–5 follow the fixed diagram's relationship groups; no positions change. */
window.ICT450_ERD_LESSONS = {
  feb23:[
    {title:"Resolve retailer–product distribution",lead:"Read the contract rule from both directions before drawing either connector.",rows:[
      [4,"one or more products","How many products can one retailer distribute?","At least one, potentially many. One product can occur in many retailer contracts."],
      [4,"more than one retailer","Can one product belong to just one retailer?","No. The paper requires more than one retailer per product; ordinary Crow’s Foot 1..many cannot express the stronger minimum of two."],
      [4,"contract with Chanteq Boutique","What identifies one retailer–product contract?","The retailer/product pairing. Neither RETAILER nor PRODUCT alone can hold all contracts."]
    ],bridges:[{name:"RETAILER_PRODUCT",left:"RETAILER",right:"PRODUCT",why:"The rule is M:N: a retailer distributes many products and a product reaches many retailers. RETAILER_PRODUCT records each pairing and replaces M:N with RETAILER 1:M RETAILER_PRODUCT and PRODUCT 1:M RETAILER_PRODUCT."}],notes:["The model uses the two parent identifiers as the bridge’s composite primary key. A separate contract number or contract terms would need an explicit rule before being added."]},
    {title:"Interpret each SKU and its colour",lead:"A SKU is a distinct recorded item; its two parent links answer different questions.",rows:[
      [2,"Each SKU belongs to a specific product","Can one SKU describe two products, and how many distinct SKUs does one product have?","Each SKU refers to exactly one PRODUCT, and each PRODUCT has one distinct SKU. Mark 1:1 at both ends and make SKU.ProductID unique."],
      [3,"Each SKU has only one color","Where should the selected colour be recorded?","Store ColorID as a foreign key in SKU, not as a free-text product colour."],
      [3,"may never be used","Must every colour already appear on a SKU?","No. One COLOR can be linked to zero or many SKUs, while every SKU selects one COLOR."]
    ],bridges:[],notes:["PRODUCT–SKU is modelled as 1:1. COLOR–SKU is a separate 1:M link: each SKU has one colour, while a colour may be unused. A unique SKU.ProductID enforces the first relationship's reverse maximum."]},
    {title:"Determine the retailer–store identifier",lead:"Use the shipping rule to decide which parent owns a store and how to distinguish stores.",rows:[
      [5,"Each retailer has one or more stores","How many stores must one retailer have?","One or more; every STORE belongs to one RETAILER in this model."],
      [5,"store id and customer id","Is StoreID sufficient on its own?","No global uniqueness is stated. Use RetailerID with StoreID as a composite identifier; interpreting ‘customer id’ as the retailer identifier is an explicit context-based assumption."],
      [5,"address","Which record holds the shipping destination?","STORE, because the address identifies a particular store’s delivery location."]
    ],bridges:[],notes:["STORE is a dependent entity with a composite identifier, not an M:N bridge."]}
  ],
  jul23:[
    {title:"Resolve hiker participation in trips",lead:"Ask what one joining means before placing the dates or drawing cardinalities.",rows:[
      [4,"can join many","Can a hiker have multiple trip registrations?","Yes. ‘Can’ permits no registrations yet and allows many; the model reads HIKER to HIKER_TRIP as 0..many."],
      [4,"Start date of hike and end date of hike","Do these dates describe a hiker or a trip by itself?","Neither. They describe one hiker on one trip, so they belong to HIKER_TRIP."],
      [4,"many trips","Can a trip have several hikers?","The worked model treats trip participation as reusable across hikers. The wording does not state an exact minimum per trip; do not invent one."]
    ],bridges:[{name:"HIKER_TRIP",left:"HIKER",right:"TRIP",why:"A hiker can join multiple trips, and a trip can register multiple hikers in the worked design. HIKER_TRIP records each joining, replacing M:N with HIKER 1:M HIKER_TRIP and TRIP 1:M HIKER_TRIP; it also holds the hike dates."}],notes:["The combined HikerID and TripID identify one registration in this model. If repeat participation in the same trip were required, a separate registration identifier would be needed; the paper does not specify that case."]},
    {title:"Resolve guide assignments to trips",lead:"The minimum for TRIP and the minimum for GUIDE are deliberately different.",rows:[
      [5,"managed by at least one","How many guides must a trip have?","At least one, possibly many. Each TRIP must have one or more TRIP_GUIDE assignments."],
      [5,"may not assign to any trip","Must every guide already manage a trip?","No. GUIDE may have zero assignments; some guides may manage several trips."],
      [5,"Payment for each assigned trip","Is Payment a permanent attribute of GUIDE?","No. Payment depends on the guide–trip assignment, so store it in TRIP_GUIDE."]
    ],bridges:[{name:"TRIP_GUIDE",left:"TRIP",right:"GUIDE",why:"Trips can have multiple guides and guides can serve multiple trips. TRIP_GUIDE turns that M:N assignment into two 1:M links and gives the per-assignment Payment a proper home."}],notes:["The TRIP side requires at least one guide; a foreign key in each assignment row alone cannot guarantee that at least one such row exists for every trip."]},
    {title:"Read contacts and destinations",lead:"These two relationships do not need associative entities.",rows:[
      [2,"any family member","Is a family contact required for every hiker?","‘Any’ allows a hiker to have zero or many FAMILY_MEMBER records; each contact belongs to one HIKER."],
      [6,"one destination","How many mountains can one trip name as its destination?","Exactly one MOUNTAIN per TRIP. A mountain may be the destination of several trips."],
      [6,"mountain name, height and country","Has the paper supplied a unique mountain identifier?","No. MountainID is a proposed design key, marked as such in the diagram."]
    ],bridges:[],notes:["FamilyMemberID is likewise proposed rather than quoted from the paper."]}
  ],
  jan24:[
    {title:"Resolve officer–duty assignments",lead:"Separate the reusable duty catalogue from a dated assignment of an officer.",rows:[
      [2,"five main duties","Does this phrase name five tables, and what assignment count might it require?","No. Model one DUTY catalogue. The wording can require exactly five assignments for each officer; show the 1:M structure and record the exact-five constraint separately."],
      [2,"each duty will be carried out by more than one police officer","Can one duty be assigned to several officers?","Yes, and the stated minimum is two officers per duty. The 1..many symbol cannot express a minimum of two, so record that as an additional business constraint."],
      [2,"date and time of each assigned duty","Does the date belong to OFFICER or DUTY alone?","No. It describes an individual assignment and belongs to OFFICER_DUTY."]
    ],bridges:[{name:"OFFICER_DUTY",left:"POLICE_OFFICER",right:"DUTY",why:"Officers may carry out multiple duties, and a duty involves multiple officers. OFFICER_DUTY resolves M:N into two 1:M relationships and stores assignment Date and Time. The worked key also includes date and time to distinguish repeated assignments."}],notes:["DutyID is a proposed identifier, not a stated identifier in the paper. Exactly five duty assignments per officer and more than one officer per duty need constraints beyond ordinary Crow’s Foot endpoints."]},
    {title:"Resolve offences on a summon",lead:"Distinguish an issued SUMMON from the catalogue of offence types it contains.",rows:[
      [5,"Each summon will consist more than one","How many offence entries are required on a summon?","More than one. Draw the many side, then state the minimum-of-two rule separately because a Crow’s Foot cannot show it precisely."],
      [5,"Offense ID, offense name, description, and rate of fees","Are these attributes of each issued summon?","No. They describe an OFFENSE type that can be referenced by summon entries."],
      [5,"Offense ID","How should repeated offence types be represented across summons?","The worked model reuses OFFENSE records through SUMMON_OFFENSE. Reuse across multiple summons is a modelling interpretation, not an explicit count in the wording."]
    ],bridges:[{name:"SUMMON_OFFENSE",left:"SUMMON",right:"OFFENSE",why:"A SUMMON contains multiple OFFENSE types and the worked model reuses each type across summons. SUMMON_OFFENSE records each inclusion and turns the resulting M:N structure into two 1:M links."}],notes:["SummonID is a proposed identifier. The paper does not state an independent identifier for an individual summon–offence entry."]},
    {title:"Identify the issuer and recipient",lead:"Use two foreign keys on SUMMON because the officer and student play different roles.",rows:[
      [3,"can issue","Which record identifies who issued a summon?","SUMMON carries PoliceID as a foreign key to POLICE_OFFICER; one officer may issue several summons."],
      [3,"several students","Where is the recipient recorded?","SUMMON carries StudentID as a foreign key to STUDENT; a student may receive multiple summons."],
      [3,"date of summon issuance","Is issue date an attribute of the student?","No. Put IssueDate on the individual SUMMON record."]
    ],bridges:[],notes:["StudentID is a proposed identifier because the question does not supply one. This is a design decision, not source wording."]}
  ],
  jul24:[
    {title:"Interpret team participation",lead:"First distinguish a team entering a tournament from a player belonging to a team.",rows:[
      [2,"participate in tournaments","Can tournament membership be stored on TEAM alone?","The worked model allows teams in multiple tournaments and tournaments with multiple teams. This M:N interpretation needs one row per participation; the paper does not specify exact minima."],
      [3,"One player can join only one team","Does a player need a tournament key?","No. Store TeamID in PLAYER: each player has one TEAM, and a TEAM can have multiple players."],
      [2,"team id, team name and coach name","What identifies the participating team?","TeamID identifies TEAM. A TOURNAMENT_TEAM row combines that key with TournamentID."]
    ],bridges:[{name:"TOURNAMENT_TEAM",left:"TOURNAMENT",right:"TEAM",why:"The worked design treats tournament entry as M:N. TOURNAMENT_TEAM records each tournament–team pairing and converts it into TOURNAMENT 1:M TOURNAMENT_TEAM and TEAM 1:M TOURNAMENT_TEAM. No extra registration fields are supplied."}],notes:["The M:N participation is an interpretation of ‘teams who participate in tournaments’, not a stated minimum or maximum. Do not claim the question explicitly says each team enters many tournaments."]},
    {title:"Trace tournament, fixture, match and venue",lead:"Follow the scheduling chain rather than merging its distinct records.",rows:[
      [7,"each fixture belongs to only one tournament","Where does TournamentID belong?","In FIXTURE. One TOURNAMENT can schedule multiple fixtures."],
      [9,"each match is associated with only one fixture","Where does FixtureID belong?","In MATCH. A FIXTURE can contain multiple MATCH records."],
      [6,"selected venues for each matches","How is a match’s venue found?","MATCH carries VenueID; each match uses one VENUE in this worked model, and a venue can host many matches."]
    ],bridges:[],notes:["‘Multiple matches’ states more than one per fixture; a standard 1..many symbol does not encode a minimum of two."]},
    {title:"Keep home and away team roles separate",lead:"The two team references answer different questions even though both point to TEAM.",rows:[
      [5,"home team ID","Which team plays at home in this match?","MATCH stores HomeTeamID as one TEAM reference."],
      [5,"away team ID","Which team plays away in this match?","MATCH stores AwayTeamID as a second, separately named TEAM reference."],
      [5,"result and venue","Where do the result and venue belong?","On MATCH, because they describe one scheduled match rather than TEAM or TOURNAMENT."]
    ],bridges:[],notes:["Two named TEAM–MATCH connectors are role relationships, not an M:N bridge. A rule prohibiting the same team in both roles would need separate validation."]}
  ],
  feb25:[
    {title:"Separate supplier partnerships and material supply",lead:"The first rule contains two different pairings; analyse each independently.",rows:[
      [2,"Each studio deals with many suppliers","Can one studio have several supplier partnerships?","Yes. The worked model also permits a supplier to serve several studios; that reverse multiplicity is an interpretation, not an explicit count in the question."],
      [2,"supply a variety of art materials","Can a supplier provide several material types?","Yes. The worked model permits a material type to be provided by several suppliers; that reverse multiplicity is a design interpretation."]
    ],bridges:[
      {name:"STUDIO_SUPPLIER",left:"STUDIO",right:"SUPPLIER",why:"Under the worked M:N partnership interpretation, STUDIO_SUPPLIER records each studio–supplier pairing and replaces it with two 1:M links."},
      {name:"SUPPLIER_MATERIAL",left:"SUPPLIER",right:"ART_MATERIAL",why:"Under the worked M:N supply interpretation, SUPPLIER_MATERIAL records each supplier–material pairing and replaces it with two 1:M links. It is separate from the studio partnership."}
    ],notes:["Do not invent a direct STUDIO–ART_MATERIAL link: the supplied route runs through SUPPLIER. A subtype such as VISUAL_ART is not an M:N bridge, despite having a parent key."]},
    {title:"Complete programme types and employee skills",lead:"A subtype inherits a programme identity; an employee–skill acquisition is a different kind of association.",rows:[
      [3,"classified as Visual Art","Is Visual Art another supplier relationship?","No. It is one specialisation of PROGRAM; VISUAL_ART inherits ProgramID and adds ClassType."],
      [3,"Glass Painting","What does this programme type add?","GLASS_PAINTING uses the parent ProgramID and records ProgramLevel (1–5)."],
      [3,"Handicraft","What does this programme type add?","HANDICRAFT uses the parent ProgramID and records CraftData."],
      [6,"Many employees in the studio acquire many skills","Can SkillID be placed once on EMPLOYEE or EmployeeNo once on SKILL?","No. Both sides can occur many times; one EMPLOYEE_SKILL row represents one employee acquiring one skill."]
    ],bridges:[{name:"EMPLOYEE_SKILL",left:"EMPLOYEE",right:"SKILL",why:"The question explicitly says many employees acquire many skills. EMPLOYEE_SKILL converts this M:N relationship into EMPLOYEE 1:M EMPLOYEE_SKILL and SKILL 1:M EMPLOYEE_SKILL."}],notes:["SkillID is proposed because only SkillType and Description are supplied. PROGRAM is the supertype; its three named subtypes are a classification, not three unrelated programme tables."]},
    {title:"Read studio ownership and employee marriage",lead:"Distinguish ordinary studio links from the optional recursive marriage record.",rows:[
      [3,"One art studio provides many programs","Where is the studio link stored?","PROGRAM carries StudioID; each programme belongs to one STUDIO in this model."],
      [4,"only one art studio","Can an employee work in two studios?","No. EMPLOYEE carries one StudioID; a STUDIO can have several employees."],
      [5,"married to another employee of the same studio","What two roles are needed?","EMPLOYEE_MARRIAGE refers to the employee and spouse separately, records DateOfMarriage, and must enforce the same-studio condition outside basic cardinality symbols."]
    ],bridges:[],notes:["EMPLOYEE_MARRIAGE is a relationship record for an optional self-reference, not a general M:N bridge. The model must prevent duplicate reversed spouse pairs."]}
  ],
  jul25:[
    {title:"Locate the waste weight and supervisor role",lead:"A collection weight belongs to a duty–waste occurrence; supervision links COLLECTOR back to itself.",rows:[
      [8,"collects various types of solid waste","Can one duty include several waste types?","Yes. The worked model also reuses each waste type across duties; that reverse count is a design interpretation."],
      [10,"total weight","Does this weight describe a waste type in every collection?","No. It belongs to the specific duty–waste pairing and is stored in DUTY_WASTE."],
      [2,"Each collector is managed by one supervisor","Is SUPERVISOR a separate table, and who supervises the top-level supervisor?","No separate table: a supervisor is another COLLECTOR. The designated top-level supervisor has no SupervisorID; every other collector has exactly one."]
    ],bridges:[{name:"DUTY_WASTE",left:"COLLECTION_DUTY",right:"SOLID_WASTE",why:"A duty can collect several waste types, and the worked model allows a waste type in multiple duties. DUTY_WASTE records each pairing, changes M:N into two 1:M links, and stores that pairing’s TotalWeight."}],notes:["The top-level collector is the exception to the general supervision rule. Show 0..1 at the supervisor end; require exactly one supervisor for other collectors and prevent supervision cycles."]},
    {title:"Assign each duty to a collector and locality",lead:"A duty session is the central event record, with one responsible collector and one service area.",rows:[
      [3,"Each duty involves only one collector","Where should CollectorID be stored?","On COLLECTION_DUTY. A collector has several duties, but each duty has one collector."],
      [4,"one locality","Can a duty session span two localities?","Not under this rule. Store one LocalityID on COLLECTION_DUTY; the same locality may recur across duties."],
      [3,"collection date","Does this date identify the locality or collector?","Neither. It describes the duty session and belongs on COLLECTION_DUTY."]
    ],bridges:[],notes:["DutyID is a proposed key because the question does not supply a unique duty identifier."]},
    {title:"Link the duty vehicle and locality houses",lead:"Keep the vehicle used on a session separate from the houses located in an area.",rows:[
      [4,"one vehicle","Where is the vehicle used for a duty recorded?","COLLECTION_DUTY carries PlateNo; each duty uses one VEHICLE, and the vehicle can be reused on later duties."],
      [7,"each house is located in one locality","Where should LocalityID be stored for a house?","On HOUSE. A LOCALITY contains several houses; every HOUSE belongs to one LOCALITY."],
      [7,"address and category","Which record owns these details?","HOUSE. HouseID is a proposed identifier because the paper does not provide one."]
    ],bridges:[],notes:["The same LOCALITY appears in both the duty and house relationships, but those relationships answer different questions."]}
  ]
};

/* Step 1 noun evidence and Step 5 endpoint source links. These mirror the
   question transcription; the completed model itself remains unchanged. */
window.ICT450_ERD_FOUNDATIONS = {
  feb23:{entities:[
    ["PRODUCT",1,"products","Products have their own unique ProductID and name; several product records must be distinguished."],
    ["SKU",2,"stock-keeping unit (SKU)","A SKU has its own number and description. It is not just a Product colour field."],
    ["COLOR",3,"colors","Colours have identifiers and descriptions, and can exist before any SKU uses them."],
    ["RETAILER",4,"retailer","Retailers have identifiers, contact details and product-distribution contracts."],
    ["STORE",5,"stores","A retailer can have several distinct shipping locations, each with its own address."]
  ],edgeRules:[2,3,5,4,4]},
  jul23:{entities:[
    ["HIKER",1,"hikers","Each hiker has an identifier and personal contact details."],
    ["FAMILY_MEMBER",2,"family member","A hiker's contact is a separate person with their own name and emergency details."],
    ["TRIP",3,"trip","Trips have their own ID, name, duration and fee."],
    ["GUIDE",5,"guide","Guides are identified by employee ID and have their own profile and assignments."],
    ["MOUNTAIN",6,"mountain","A mountain has reusable name, height and country details for trip destinations."]
  ],edgeRules:[2,4,4,5,5,6]},
  jan24:{entities:[
    ["DUTY",2,"five main duties","Duties are reusable types; ‘five’ is not a reason to create five different tables."],
    ["POLICE_OFFICER",1,"police officer","Officers have a supplied Police ID and their own profile details."],
    ["SUMMON",3,"summons","Each issued summon is an occurrence with an issuer, recipient and issue date."],
    ["STUDENT",3,"students","A student can receive summons over time, so the recipient needs a distinct record."],
    ["OFFENSE",5,"offense","Offence types have a supplied ID, description and fee rate, reusable across summons in this model."]
  ],edgeRules:[2,2,3,3,5,5]},
  jul24:{entities:[
    ["TOURNAMENT",1,"Tournaments","Each tournament has its own ID, dates and organiser."],
    ["TEAM",2,"Team","Teams have their own ID, name and coach, independently of a particular match."],
    ["PLAYER",3,"Player","Players have individual IDs and personal details; each belongs to one team."],
    ["FIXTURE",4,"Fixture","A fixture is a schedule record with its own ID and kick-off time."],
    ["MATCH",5,"Match","An individual match has an ID, date, result and two team roles."],
    ["VENUE",6,"Venue","Venues have reusable IDs, locations and seating capacities."]
  ],edgeRules:[2,2,8,7,9,6,5,5]},
  feb25:{entities:[
    ["STUDIO",1,"studios","Studios have unique IDs, addresses and contact details."],
    ["SUPPLIER",2,"suppliers","Suppliers have their own identifiers and details, separate from studio partnerships."],
    ["ART_MATERIAL",2,"art materials","Materials have IDs, descriptions and prices that are not supplier contact fields."],
    ["PROGRAM",3,"programs","Each programme has an ID and shared name, description and price before its specialisation is considered."],
    ["EMPLOYEE",4,"employees","Employees have unique numbers and personal/job details."],
    ["SKILL",6,"skills","Skill type and description describe reusable skill records; SkillID is a proposed identifier."]
  ],edgeRules:[2,2,2,2,3,4,3,3,3,6,6,5,5]},
  jul25:{entities:[
    ["COLLECTOR",1,"collector","Collectors have IDs, names and phone numbers; supervisors are a role of collectors, not a new person type."],
    ["COLLECTION_DUTY",3,"collection duties","A duty is a dated collection session linking its collector, locality and vehicle."],
    ["LOCALITY",4,"locality","A locality has its own ID, name and postcode and contains houses."],
    ["HOUSE",7,"houses","Houses have addresses and categories within a locality; HouseID is a proposed key."],
    ["VEHICLE",4,"vehicle","Vehicle details belong to a reusable vehicle identified by plate number."],
    ["SOLID_WASTE",8,"solid waste","Waste types have their own ID, name and category; collection weight belongs elsewhere."]
  ],edgeRules:[2,3,4,4,7,8,8]}
};
