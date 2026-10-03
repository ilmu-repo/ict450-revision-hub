/* Additional ERD case data for the worked questions. */
const provisionalCases = [
  {
    id:"dec19",session:"December 2019",title:"Auto Servis: dealership, invoices and vehicles",
    paper:"../../ICT450-revision-hub/04-exams/repaired/DEC19%20-%20repaired%20derivative.pdf",
    pages:["../../ICT450-revision-hub/03-erd-guide/assets/december-2019-q5-source.png"],
    intro:"Auto Servis Sdn Bhd launched their first ever automotive company. Auto Servis Sdn Bhd plan to hire a database designer to build their own Car Dealership System (CDS). These requirements are required to model the database of CDS:",
    rules:[
      "[[c:Each salesperson is managed by one manager]] and [[c:each manager needs to manage many salespersons]].",
      "[[e:Manager]] has [[a:manager ID, first name and last name]].",
      "A [[e:salesperson]] has their [[a:ID, first name and last name]]. A salesperson is [[r:assigned]] to [[c:more than one customer]].",
      "Each [[e:customer]] has their [[a:customer ID, first name, last name, phone number, address, city, state and country]]. Each customer [[c:can buy more than one vehicle]].",
      "Every [[e:vehicle]] has its own, unique [[a:Vehicle Identification Number (VIN)]] which also referred to as the body number.",
      "Each vehicle can be [[r:categorized]] as [[e:Car]], [[e:Truck]] and [[e:SUV]]. Car has [[a:engine size]], truck has [[a:tonnage]] and SUV has [[a:number of seats]] as their attribute respectively.",
      "An [[e:invoice]] is [[r:issued]] to [[e:customers]]. It includes a unique [[a:invoice number]], a [[a:salesperson's ID]], [[a:VIN]] as well as the [[a:date of invoice]]."
    ],
    preTasks:"Based on the given information:",
    taskA:"Construct a complete Entity Relationship Diagram (ERD) with all required entities, attributes, relationships as well as the cardinalities using the Crow's Foot notation and include relevant attributes when necessary.",
    taskB:"Briefly describe TWO (2) examples of reports that can be generated from ERD in (a). (4 marks)",
    reviewNotes:[
      "The paper does not say whether a CUSTOMER may have several assigned salespersons. This worked model uses exactly one.",
      "The paper does not settle repeat sales of the same VIN. This worked model allows at most one invoice per VIN.",
      "The source names CAR, TRUCK and SUV categories but does not state their constraints. This model treats them as mutually exclusive and exhaustive.",
      "INVOICE.CustomerID and CUSTOMER.SalespersonID are proposed links inferred from the wording, not attributes listed in the paper."
    ],
    nodes:[
      ["MANAGER","ManagerID (PK)|FirstName|LastName",0,1],
      ["SALESPERSON","SalespersonID (PK)|FirstName|LastName|ManagerID (FK)",1,1],
      ["CUSTOMER","CustomerID (PK)|FirstName|LastName|Phone|Address|City|State|Country|SalespersonID (FK)*",2,1],
      ["INVOICE","InvoiceNo (PK)|CustomerID (FK)*|SalespersonID (FK)|VIN (FK)*|InvoiceDate",2,3],
      ["VEHICLE","VIN (PK)|VehicleType*",3,3],
      ["CAR","VIN (PK/FK)|EngineSize",1,5],
      ["TRUCK","VIN (PK/FK)|Tonnage",2,5],
      ["SUV","VIN (PK/FK)|SeatCount",3,5]
    ],
    edges:[
      ["MANAGER","SALESPERSON","manages","1","many"],
      ["SALESPERSON","CUSTOMER","assigned to","1","many"],
      ["CUSTOMER","INVOICE","receives","1","0many"],
      ["SALESPERSON","INVOICE","records sale","1","0many"],
      ["VEHICLE","INVOICE","invoiced on","1","0one"],
      ["VEHICLE","CAR","category","1","0one"],
      ["VEHICLE","TRUCK","category","1","0one"],
      ["VEHICLE","SUV","category","1","0one"]
    ],
    stageEdgeGroups:[[0,1],[2,3,4],[5,6,7]],
    keys:[
      "ManagerID, CustomerID, VIN and InvoiceNo are expressly identified; the salesperson's stated ID is named SalespersonID in the model.",
      "VehicleType, CUSTOMER.SalespersonID and INVOICE.CustomerID are proposed implementation details; * distinguishes them from the source list.",
      "The category tables inherit VIN as PK/FK. INVOICE.VIN must be unique under this model's one-invoice-per-vehicle choice."
    ],
    cardinality:[
      "Each SALESPERSON has exactly one MANAGER; each MANAGER has many salespersons. The source's 'many' does not specify a precise minimum above one.",
      "The phrase 'more than one customer' requires at least two customers per salesperson, beyond a standard 1..many symbol.",
      "'Can buy' expresses capacity, not a required purchase. CUSTOMER-to-INVOICE is 0..many in this model; each invoice has one customer.",
      "An invoice records one salesperson and VIN. At most one invoice per VIN is an interpretation, not a stated rule.",
      "Each vehicle is treated as exactly one of CAR, TRUCK and SUV; individual 0..1 subtype links need a total/disjoint constraint to enforce that combined rule."
    ],
    checks:[
      "Assignment and invoice links are modelling interpretations; distinguish them from relationships stated directly in the question.",
      "The source says a customer can buy vehicles, but the transaction is represented through INVOICE rather than a duplicate direct CUSTOMER–VEHICLE link.",
      "Do not infer price or payment from the source. A revenue report cannot be calculated from this ERD as stated.",
      "Verify the at-least-two customers per salesperson and exactly-one-category constraints outside ordinary Crow's Foot symbols."
    ],
    reports:[
      "Invoice activity by salesperson, with invoice number, date, customer and VIN.",
      "Invoiced vehicles by type and customer location, using CAR/TRUCK/SUV and the customer's city or state."
    ]
  },
  {
    id:"feb22",session:"February 2022",title:"UiTM: volunteer projects and assignments",
    paper:"../../ICT450-revision-hub/04-exams/official/FEB22.pdf",
    pages:["../../ICT450-revision-hub/03-erd-guide/assets/february-2022-q5-source.png"],
    intro:"UiTM is planning to develop a volunteer management system for a better coordination and reporting for the volunteerism activities. As a database designer, you are assigned to design the database system according to the following requirements:",
    rules:[
      "Any [[e:student]] or [[e:staff]] [[c:can be a volunteer]].",
      "Each student or staff [[c:can fill only one entry form]]. The details are [[a:volunteer ID, register date and total hours of working]].",
      "[[e:Volunteer]] [[c:can volunteer in more than one projects]].",
      "Each [[e:assigned project]] will have details about [[a:start date, end date, hours, station and status]]. Each assigned project also will [[r:lead by one faculty]].",
      "Each [[e:project]] will have their own [[a:project ID and project name]] such as trash clean up, money donation, animal shelter and others."
    ],
    preTasks:"Based on the given information:",
    taskA:"Construct an Entity Relationship Diagram (ERD) complete with all of the required tables, attributes and relationships using the Crow's Foot notation that reflects all of the given business rules.",
    taskB:"Identify TWO (2) relevant information that you can get from the ERD you construct in (a). Briefly explain your answer. (4 marks)",
    reviewNotes:[
      "The PERSON supertype and overlapping STUDENT/STAFF roles are design choices; the paper does not prescribe this structure.",
      "PersonID, FacultyID and FacultyName are proposed implementation fields, not supplied identifiers or attributes.",
      "This model reads 'each assigned project ... led by one faculty' as one leader for each VOLUNTEER–PROJECT assignment, not one leader for the PROJECT overall.",
      "VolunteerID + ProjectID identifies an assignment in this model. Recording repeat participation in the same project would require an additional occurrence identifier."
    ],
    nodes:[
      ["PERSON","PersonID (PK)*",0,1],
      ["VOLUNTEER","VolunteerID (PK)|PersonID (FK)*|RegisterDate|TotalHours",1,1],
      ["PROJECT","ProjectID (PK)|ProjectName",2,1],
      ["STUDENT","PersonID (PK/FK)*",0,3],
      ["STAFF","PersonID (PK/FK)*",1,3],
      ["ASSIGNMENT","VolunteerID (PK/FK)|ProjectID (PK/FK)|FacultyID (FK)*|StartDate|EndDate|Hours|Station|Status",2,3,"bridge"],
      ["FACULTY","FacultyID (PK)*|FacultyName*",3,3]
    ],
    edges:[
      ["PERSON","STUDENT","student role","1","0one"],
      ["PERSON","STAFF","staff role","1","0one"],
      ["PERSON","VOLUNTEER","submits form","1","0one"],
      ["VOLUNTEER","ASSIGNMENT","volunteers on","1","0many"],
      ["PROJECT","ASSIGNMENT","assigned to","1","0many"],
      ["FACULTY","ASSIGNMENT","leads","1","0many"]
    ],
    stageEdgeGroups:[[0,1,2],[3,4],[5]],
    keys:[
      "VolunteerID and ProjectID are supplied identifiers. The paper does not provide StudentID, StaffID, PersonID or FacultyID.",
      "PERSON is a proposed supertype so one person can have a STUDENT and/or STAFF role. Its PersonID is not source wording.",
      "VOLUNTEER.PersonID is a proposed unique FK: it enforces no more than one entry form per person.",
      "ASSIGNMENT uses VolunteerID + ProjectID as the model key; add an occurrence key if repeated participation in one project must be recorded."
    ],
    cardinality:[
      "'Can be' and 'can fill' do not require every student or staff member to volunteer. One PERSON may have zero or one VOLUNTEER entry; each entry belongs to exactly one PERSON.",
      "STUDENT and STAFF are proposed overlapping roles of PERSON; the source does not establish whether they are disjoint.",
      "A VOLUNTEER must refer to a PERSON who has a STUDENT or STAFF role; the three individual links alone do not enforce that eligibility rule.",
      "'Can volunteer in more than one' permits multiple assignments but does not require at least two. A PROJECT may have no assignments until somebody joins.",
      "Each ASSIGNMENT has one VOLUNTEER, one PROJECT and, under this model's reading, one FACULTY leader.",
      "TotalHours may be derived from ASSIGNMENT.Hours or stored with a consistency rule; the source does not resolve this."
    ],
    checks:[
      "The red ASSIGNMENT is an M:N resolution, not a separate project catalogue; its dates, hours, station and status are tied to one volunteer's project participation.",
      "The volunteer form's one-entry maximum needs a unique PersonID reference in VOLUNTEER; a Crow's Foot endpoint alone does not enforce every record-level rule.",
      "Check that every VOLUNTEER also has a STUDENT or STAFF role; a bare PERSON record is not enough under the stated eligibility rule.",
      "The faculty link is deliberately on ASSIGNMENT; a single leader for an entire PROJECT would require a different FK placement.",
      "Do not claim that the paper supplies PERSON, FacultyID, FacultyName or a fixed minimum of two project assignments."
    ],
    reports:[
      "Volunteer participation by project, including assignment dates, station, status and hours.",
      "Faculty workload: assignments led by each faculty and the recorded assignment hours."
    ]
  }
];

const provisionalLessons = {
  dec19:[
    {title:"Trace management and customer assignment",lead:"Start with the stated manager rule, then ask what the customer assignment says—and does not say—about each end.",rows:[
      [1,"Each salesperson is managed by one manager","How many managers can manage one salesperson?","Exactly one. Store ManagerID on SALESPERSON; a MANAGER connects to many salesperson records."],
      [1,"each manager needs to manage many salespersons","Does the wording require a manager to have staff?","Yes: at least one in an ordinary 1..many diagram. If 'many' means a stronger minimum, state that separately."],
      [3,"assigned to more than one customer","Does this establish the reverse count for a customer?","It establishes at least two customers per SALESPERSON, but not whether a CUSTOMER may have several salespersons. This model chooses exactly one assigned salesperson per customer."]
    ],bridges:[],notes:["If customers may be assigned to several salespersons, replace the direct FK with an assignment bridge. The paper does not settle that choice."]},
    {title:"Place the sale on the invoice",lead:"Follow the purchase and invoice wording together; do not draw a duplicate direct sale link and lose the transaction record.",rows:[
      [4,"can buy more than one vehicle","Is every customer required to have made a purchase?","No. 'Can' states capacity. A CUSTOMER can have zero or many INVOICE records in this model."],
      [7,"An invoice is issued to customers","How does each invoice identify its customer?","Add proposed CustomerID to INVOICE. The relationship is implied, but that attribute is not in the paper's invoice list."],
      [7,"a salesperson's ID","Where is the salesperson who issued the invoice recorded?","On INVOICE as SalespersonID; one salesperson may record many invoices."],
      [7,"VIN","Can one vehicle appear on multiple invoices?","The wording does not decide. This model assumes at most one invoice per VIN and therefore requires INVOICE.VIN to be unique."]
    ],bridges:[],notes:["Do not infer selling price, amount paid or payment from the invoice wording. The customer-to-vehicle purchase is represented through INVOICE."]},
    {title:"Interpret the vehicle categories",lead:"Treat VIN as the shared vehicle identity, then separate the attributes that belong only to one category.",rows:[
      [5,"unique Vehicle Identification Number (VIN)","What key identifies a vehicle and each category record?","VIN identifies VEHICLE; CAR, TRUCK and SUV inherit the same VIN as PK/FK."],
      [6,"categorized as Car, Truck and SUV","Is this one general vehicle plus three category types?","That is this model's reading. A VEHICLE has category-specific details in one subtype; total and disjoint category rules need separate enforcement."],
      [6,"engine size","Should EngineSize be on every vehicle?","No. Put it on CAR; Tonnage belongs to TRUCK and SeatCount to SUV."]
    ],bridges:[],notes:["The source suggests categories but does not explicitly say one and only one category per VIN. This model chooses that constraint; state it as an assumption in an examination answer."]}
  ],
  feb22:[
    {title:"Identify who may submit one form",lead:"The source names student and staff roles but supplies no person identifier; make the supertype decision visible.",rows:[
      [1,"Any student or staff can be a volunteer","Must all students and staff already be volunteers?","No. A PERSON can have zero or one VOLUNTEER entry under the proposed supertype design."],
      [2,"can fill only one entry form","Where is the maximum of one form enforced?","A proposed unique PersonID reference in VOLUNTEER enforces at most one form per PERSON."],
      [2,"volunteer ID, register date and total hours of working","Which record owns the form fields?","VOLUNTEER owns its stated VolunteerID, RegisterDate and TotalHours; PersonID is proposed, not stated."]
    ],bridges:[],notes:["STUDENT and STAFF are represented as overlapping PERSON roles in this model. Every VOLUNTEER must have at least one of those roles; the simple links do not enforce that combined condition. Separate student/staff identifiers or a disjoint rule would be different, defensible designs; the paper does not resolve them."]},
    {title:"Resolve volunteer participation in projects",lead:"A project assignment is an occurrence with its own dates and working details, not a permanent attribute of the person or project.",rows:[
      [3,"can volunteer in more than one projects","Can one volunteer have several project participations?","Yes. The model allows zero or many ASSIGNMENT records; 'can' does not require two."],
      [4,"start date, end date, hours, station and status","Where do these details belong?","On ASSIGNMENT, because they describe one volunteer on one project."],
      [5,"project ID and project name","What identifies the reusable project?","ProjectID is a supplied key for PROJECT; this model uses VolunteerID + ProjectID to identify an assignment."]
    ],bridges:[{name:"ASSIGNMENT",left:"VOLUNTEER",right:"PROJECT",why:"The worked design allows volunteers on multiple projects and projects with multiple volunteers. ASSIGNMENT records each pairing, resolves this M:N as VOLUNTEER 1:M ASSIGNMENT and PROJECT 1:M ASSIGNMENT, and holds the participation dates, hours, station and status."}],notes:["The paper does not specify repeat participation by the same volunteer in the same project. An AssignmentID or occurrence key is needed if repeated enrolments must be retained."]},
    {title:"Locate the faculty leader",lead:"Read 'each assigned project' carefully: the location of FacultyID changes if one leader oversees the whole project instead.",rows:[
      [4,"Each assigned project also will lead by one faculty","Does 'assigned project' mean an individual volunteer–project assignment?","This model reads it that way: each ASSIGNMENT has exactly one FACULTY leader. A faculty can lead zero or many assignments."],
      [4,"one faculty","Which foreign key records that leader?","Proposed FacultyID is an FK on ASSIGNMENT. A project-level leader would put it on PROJECT instead."],
      [4,"hours, station and status","Do these change the faculty–assignment cardinality?","No. They remain properties of the specific ASSIGNMENT, while the leader is another link from that same record."]
    ],bridges:[],notes:["FacultyID and FacultyName are proposed because the paper supplies neither. The alternative project-level leadership reading should be acknowledged if a student explains it consistently."]}
  ]
};

const provisionalFoundations = {
  dec19:{entities:[
    ["MANAGER",2,"Manager","A manager has a stated ID and name and can manage distinct salesperson records."],
    ["SALESPERSON",3,"salesperson","Salespersons have their own ID and name, plus management and customer assignments."],
    ["CUSTOMER",4,"customer","Customers have a stated ID, contact/location details and possible purchases."],
    ["INVOICE",7,"invoice","An invoice has a unique number, date, salesperson and VIN and records a particular sale."],
    ["VEHICLE",5,"vehicle","Every vehicle has a unique VIN, distinct from a category description."],
    ["CAR",6,"Car","Only cars have the engine-size attribute; this is a proposed vehicle subtype."],
    ["TRUCK",6,"Truck","Only trucks have the tonnage attribute; this is a proposed vehicle subtype."],
    ["SUV",6,"SUV","Only SUVs have a seat-count attribute; this is a proposed vehicle subtype."]
  ],edgeRules:[1,3,7,7,7,6,6,6]},
  feb22:{entities:[
    ["PERSON",1,"student or staff","PERSON is a proposed shared identity for eligible people, not an entity named in the paper."],
    ["STUDENT",1,"student","The paper names students as one population eligible to volunteer."],
    ["STAFF",1,"staff","The paper names staff as another eligible population; possible overlap is unresolved."],
    ["VOLUNTEER",3,"Volunteer","A volunteer may participate in several projects and has a form with its own identifier."],
    ["PROJECT",5,"project","Projects have a supplied ProjectID and ProjectName and may receive assignments."],
    ["FACULTY",4,"faculty","The source requires a faculty leader but supplies no identifier or descriptive field."]
  ],edgeRules:[1,1,2,3,4,4]}
};

if (window.ICT450_ERD_INSTRUCTOR_DRAFT) {
  window.ICT450_ERD_CASES = provisionalCases;
  window.ICT450_ERD_LESSONS = provisionalLessons;
  window.ICT450_ERD_FOUNDATIONS = provisionalFoundations;
} else {
  for (const item of provisionalCases) {
    item.paper = item.paper.replace("../../ICT450-revision-hub/04-exams/", "../04-exams/");
    item.pages = item.pages.map(page => page.replace("../../ICT450-revision-hub/03-erd-guide/", ""));
  }
  window.ICT450_ERD_CASES.unshift(...provisionalCases);
  Object.assign(window.ICT450_ERD_LESSONS, provisionalLessons);
  Object.assign(window.ICT450_ERD_FOUNDATIONS, provisionalFoundations);
}
