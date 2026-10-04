window.ICT450_PRACTICE_DATA = {
  "meta": {
    "subject": "ICT450",
    "title": "Database Design and Development",
    "practiceCount": 122,
    "sqlCount": 33
  },
  "practice": [
    {
      "id": "FEB23-Q1-A",
      "parentId": "FEB23-Q1",
      "session": "February 2023",
      "chapters": [
        1,
        3,
        4
      ],
      "topic": "Explain file/spreadsheet issues, relationship optionality and candidate/primary keys",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Give TWO reasons file-based systems are still used today.",
      "answer": "Low cost and simplicity for small, stable operations: a small clinic may need only a limited\nnumber of paper/files and may not justify a DBMS, server, licences, and specialist support.\nLegacy and conversion constraints: existing files, procedures, trained staff, and historical records\nare already in place; migration, data cleaning, training, and workflow change require time and\nmoney."
    },
    {
      "id": "FEB23-Q1-B",
      "parentId": "FEB23-Q1",
      "session": "February 2023",
      "chapters": [
        1,
        3,
        4
      ],
      "topic": "Explain file/spreadsheet issues, relationship optionality and candidate/primary keys",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain the statement that relationships are optional in an ERD and illustrate the answer.",
      "answer": "The statement is only partly true. Relationship participation can be optional (minimum\ncardinality 0) or mandatory (minimum cardinality 1). A relationship required by a business rule\nmust still be shown.\nIllustration: one EMPLOYEE may manage zero or many PROJECT records; each PROJECT must have exactly one\nmanager."
    },
    {
      "id": "FEB23-Q1-C-I",
      "parentId": "FEB23-Q1",
      "session": "February 2023",
      "chapters": [
        1,
        3,
        4
      ],
      "topic": "Explain file/spreadsheet issues, relationship optionality and candidate/primary keys",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE common problems when a spreadsheet is used as a database.",
      "answer": "Data redundancy: many users create separate copies of the same customer data.\nData inconsistency and update anomalies: one copy is updated while other copies remain\noutdated.\nWeak data integrity, security, sharing, and multi-user control: validation and access rules are\ndifficult to enforce consistently."
    },
    {
      "id": "FEB23-Q1-C-II",
      "parentId": "FEB23-Q1",
      "session": "February 2023",
      "chapters": [
        1,
        3,
        4
      ],
      "topic": "Explain file/spreadsheet issues, relationship optionality and candidate/primary keys",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Identify FOUR candidate keys and choose ONE primary key from the CUSTOMER spreadsheet.",
      "answer": "Candidate keys: CustomerNo, CustomerIC, Email, and the composite (FirstName, LastName),\nassuming each is unique and non-null in the business rules.\nPrimary key: CustomerNo.\nReason: it is a single, short, stable, non-null identifier created specifically to identify each\ncustomer; names can repeat/change and IC/email may be sensitive or mutable.\nTip: A candidate key must be minimal: it uniquely identifies a row and contains no unnecessary\nattribute. The selected primary key should be stable, simple, unique, and never null."
    },
    {
      "id": "FEB23-Q2-A",
      "parentId": "FEB23-Q2",
      "session": "February 2023",
      "chapters": [
        3,
        6,
        8
      ],
      "topic": "Explain DBLC initial study and mobile limitations; diagnose invalid field values",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 8,
      "prompt": "Explain FOUR activities in the database initial study.",
      "answer": "Analyze the company situation: understand the mission, structure, operational components, and\nhow they interact.\nDefine problems and constraints: identify the real information problems, limitations, policies,\nbudgets, and operating restrictions.\nDefine objectives: state what the proposed database must achieve and how it will interact/share\ndata with other systems.\nDefine scope and boundaries: specify which organizational areas, data, processes, users, and\ninterfaces are included or excluded."
    },
    {
      "id": "FEB23-Q2-B",
      "parentId": "FEB23-Q2",
      "session": "February 2023",
      "chapters": [
        3,
        6,
        8
      ],
      "topic": "Explain DBLC initial study and mobile limitations; diagnose invalid field values",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 8,
      "prompt": "Describe FOUR limitations of a mobile database and give an example for each.",
      "answer": "Unstable or limited connectivity/bandwidth: a field employee in a rural area cannot synchronize\ncurrent customer records.\nSynchronization and consistency conflicts: two offline sales representatives update the same\ncustomer record and conflicting versions must be resolved.\nLimited mobile resources: storage, processing capacity, screen size, and battery make large\nqueries or multimedia records difficult to handle.\nSecurity and privacy exposure: a lost phone/tablet or insecure public wireless network may\nexpose company or customer data."
    },
    {
      "id": "FEB23-Q2-C",
      "parentId": "FEB23-Q2",
      "session": "February 2023",
      "chapters": [
        3,
        6,
        8
      ],
      "topic": "Explain DBLC initial study and mobile limitations; diagnose invalid field values",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Identify rows that fail the STAFF table rules.",
      "answer": "StaffID 3033: Salary 11000 violates the permitted salary range of 3000-10000.\nStaffID 3034: Salary “150a” violates the numeric data type/domain for Salary.\nTip: Domain integrity checks both type and allowed range. A value may be numeric but still invalid\nbecause it falls outside the permitted range."
    },
    {
      "id": "FEB23-Q3-A",
      "parentId": "FEB23-Q3",
      "session": "February 2023",
      "chapters": [
        5
      ],
      "topic": "Normalize a boarding-pass structure to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "Define normalization and explain its importance.",
      "answer": "Normalization is the process of evaluating and correcting table structures to minimize data\nredundancy and eliminate data anomalies.\nIt improves integrity and consistency by ensuring that each fact is stored in the correct table and\nupdated in one place.\nIt reduces insertion, update, and deletion anomalies and normally produces well-structured\ntables up to 3NF for business databases."
    },
    {
      "id": "FEB23-Q3-B",
      "parentId": "FEB23-Q3",
      "session": "February 2023",
      "chapters": [
        5
      ],
      "topic": "Normalize a boarding-pass structure to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Describe THREE requirements for a good normalized set of tables with examples.",
      "answer": "1NF: no repeating groups and each cell contains one atomic value. Example: store one FlightID\nper boarding row, not a list of flights in one cell.\n2NF: every non-key attribute depends on the whole composite key. Example: CustFirstName\ndepends only on CustIC and must be moved to CUSTOMER.\n3NF: no transitive dependency between non-key attributes. Example: DestinationID determines\nDestinationName, so destination details belong in DESTINATION."
    },
    {
      "id": "FEB23-Q3-C",
      "parentId": "FEB23-Q3",
      "session": "February 2023",
      "chapters": [
        5
      ],
      "topic": "Normalize a boarding-pass structure to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize BOARDING to 3NF and identify keys and dependencies.",
      "answer": "Keys and dependencies\nNotation: underlined attribute = primary key; italic attribute with * = foreign key.\n1NF schema: BOARDING_1NF (CustIC, FlightID, CustFirstName, CustLastName, PlaneType, Capacity, DestinationID,\nDestinationName, DateDepart, DateArrive, TimeDepart, TimeArrive, Seat)\nPrimary key(s)\n• CustIC + FlightID (composite primary key).\nFull dependency\n• (CustIC, FlightID) -> Seat\nPartial dependencies\n• CustIC -> CustFirstName, CustLastName\n• FlightID -> PlaneType, DestinationID, DateDepart, DateArrive, TimeDepart, TimeArrive\nTransitive dependencies\n• PlaneType -> Capacity\n• DestinationID -> DestinationName\nNormalization steps\n1NF (First Normal Form)\nEliminate repeating groups, make every attribute atomic, and identify the primary key.\nBOARDING_1NF (CustIC, FlightID, CustFirstName, CustLastName, PlaneType, Capacity, DestinationID, DestinationName,\nDateDepart, DateArrive, TimeDepart, TimeArrive, Seat) - One atomic customer-flight row; composite PK resolves the repeating\nflight group.\n2NF (Second Normal Form)\nThe relation must be in 1NF. Remove partial dependencies so every non-key attribute depends on the whole composite key.\nCUSTOMER (CustIC, CustFirstName, CustLastName) - Removes the CustIC partial dependency.\nFLIGHT_2NF (FlightID, PlaneType, Capacity, DestinationID, DestinationName, DateDepart, DateArrive, TimeDepart,\nTimeArrive) - Removes the FlightID partial dependency.\nBOARDING (CustIC*, FlightID*, Seat) - Seat depends on the whole composite key.\n3NF (Third Normal Form)\nThe relations must be in 2NF. Remove transitive dependencies so non-key attributes depend on nothing but the key.\nCUSTOMER (CustIC, CustFirstName, CustLastName) - Already in 3NF.\nPLANE (PlaneType, Capacity) - Removes PlaneType -> Capacity.\nDESTINATION (DestinationID, DestinationName) - Removes DestinationID -> DestinationName.\nFLIGHT (FlightID, PlaneType*, DestinationID*, DateDepart, DateArrive, TimeDepart, TimeArrive) - References PLANE and\nDESTINATION.\nBOARDING (CustIC*, FlightID*, Seat) - Final associative relation.\nTip: Look for “identifier -> description” pairs. DestinationID -> DestinationName and PlaneType ->\nCapacity are classic transitive dependencies that require separate tables."
    },
    {
      "id": "FEB23-Q4-A",
      "parentId": "FEB23-Q4",
      "session": "February 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Create table DELIVERY.",
      "answer": "Access SQL using explicit JOIN\nCREATE TABLE DELIVERY (\nPackageID TEXT(20) CONSTRAINT PK_DELIVERY PRIMARY KEY,\nDateDeliver DATETIME NOT NULL,\nRiderID TEXT(20) NOT NULL,\nICNum TEXT(20) NOT NULL,\nStatus TEXT(15) NOT NULL,\nCONSTRAINT FK_DELIVERY_RIDER FOREIGN KEY (RiderID)\nREFERENCES RIDER (RiderID),\nCONSTRAINT FK_DELIVERY_CUSTOMER FOREIGN KEY (ICNum)\nREFERENCES CUSTOMER (ICNum)\n);\n-- In Access table design, set Status Validation Rule to:\n-- In ('delivered','unsuccessful')\nAlternative Access SQL\nCREATE TABLE DELIVERY (\nPackageID TEXT(20) PRIMARY KEY,\nDateDeliver DATETIME NOT NULL,\nRiderID TEXT(20) NOT NULL,\nICNum TEXT(20) NOT NULL,\nStatus TEXT(15) NOT NULL,\nFOREIGN KEY (RiderID) REFERENCES RIDER (RiderID),\nFOREIGN KEY (ICNum) REFERENCES CUSTOMER (ICNum)\n);\n-- In Access Table Design, set the Status Validation Rule to:\n-- In ('delivered','unsuccessful')"
    },
    {
      "id": "FEB23-Q4-B",
      "parentId": "FEB23-Q4",
      "session": "February 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Find the total number of distinct customers who successfully received packages in November 2022.",
      "answer": "Access SQL using explicit JOIN\nSELECT Count(*) AS [Total Customers]\nFROM (\nSELECT DISTINCT ICNum\nFROM DELIVERY\nWHERE Status = 'delivered'\nAND DateDeliver >= #2022-11-01#\nAND DateDeliver < #2022-12-01#\n) AS X;\nAlternative Access SQL\n-- Query 1: list each delivered customer once.\nSELECT DISTINCT ICNum\nFROM DELIVERY\nWHERE Status = 'delivered'\nAND DateDeliver >= #2022-11-01# AND DateDeliver < #2022-12-01#;\n-- Save Query 1 as Q_DeliveredCustomersNov2022.\n-- Query 2: count the rows in the saved query.\nSELECT Count(ICNum) AS [Total Customers]\nFROM Q_DeliveredCustomersNov2022;\nAccess note: Use the complete Access SQL answer shown above; a saved-query sequence is acceptable when it returns the same result."
    },
    {
      "id": "FEB23-Q4-C",
      "parentId": "FEB23-Q4",
      "session": "February 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Find the total unsuccessful deliveries for each rider.",
      "answer": "Access SQL - complete model answer\nSELECT R.RiderID, R.RiderName,\n       Sum(IIf(D.Status='unsuccessful',1,0)) AS [Total Unsuccessful]\nFROM RIDER AS R LEFT JOIN DELIVERY AS D ON R.RiderID = D.RiderID\nGROUP BY R.RiderID, R.RiderName;\nLEFT JOIN retains riders whose count is zero."
    },
    {
      "id": "FEB23-Q4-D",
      "parentId": "FEB23-Q4",
      "session": "February 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "List rider names that have made at least one delivery.",
      "answer": "Access SQL using explicit JOIN\nSELECT DISTINCT R.RiderName\nFROM RIDER AS R\nINNER JOIN DELIVERY AS D ON R.RiderID = D.RiderID;\nAlternative Access SQL\nSELECT DISTINCT R.RiderName\nFROM RIDER R, DELIVERY D\nWHERE R.RiderID = D.RiderID;"
    },
    {
      "id": "FEB23-Q4-E",
      "parentId": "FEB23-Q4",
      "session": "February 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Produce Package ID, Customer Name, and Status.",
      "answer": "Access SQL using explicit JOIN\nSELECT D.PackageID AS [Package ID],\nC.CustName AS [Customer Name],\nD.Status\nFROM CUSTOMER AS C\nINNER JOIN DELIVERY AS D ON C.ICNum = D.ICNum;\nAlternative Access SQL\nSELECT D.PackageID AS [Package ID],\nC.CustName AS [Customer Name],\nD.Status\nFROM CUSTOMER C, DELIVERY D\nWHERE C.ICNum = D.ICNum;\nTip: SQL answers are marked line by line. Even when you are unsure, write at least one correct line.\nStart with SELECT (or CREATE/UPDATE), then add FROM, WHERE or JOIN, GROUP BY, HAVING, and\nORDER BY as far as you can. Each correct line may earn a mark, so do not leave the SQL answer blank.\nTechnical reminder: Count customers and deliveries carefully. 'Number of customers' normally requires\nunique customer IDs; 'number of deliveries' counts package/delivery rows."
    },
    {
      "id": "FEB23-Q5-A",
      "parentId": "FEB23-Q5",
      "session": "February 2023",
      "chapters": [
        4
      ],
      "topic": "Construct a boutique-distribution ERD and propose reports",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct the Chanteq Boutique Crow's Foot ERD.",
      "answer": "The ERD below uses direct Crow's Foot symbols at every relationship end: a circle means optional (minimum 0), a bar means\none, and the crow's foot means many. Read the two ends together to determine connectivity and cardinality.\nEntity and key checklist\nEntity / required key structure\nPRODUCT(ProductID PK, ProductName), SKU(SKUNumber PK, SKUDescription, ProductID FK,\nColorID FK), COLOR(ColorID PK, ColorDescription).\nRETAILER(RetailerID PK, RetailerName, PhoneNumber) and STORE with composite PK\n(RetailerID, StoreID) plus Address.\nRETAILER_PRODUCT associative entity with composite PK/FKs.\nRelationship and cardinality checklist\nRequired relationship\nPRODUCT 1 : 1 SKU; each product has one distinct SKU and each SKU belongs to one product.\nCOLOR 1 : 0..M SKU; every SKU has one color, while a color may be unused.\nRETAILER M:N PRODUCT through RETAILER_PRODUCT; retailer has one or more products and a\nproduct has more than one retailer.\nRETAILER 1 : 1..M STORE; STORE is existence-dependent on RETAILER.\nSKU.ProductID is unique and non-null. Requiring every PRODUCT to have a SKU also needs a creation/workflow rule."
    },
    {
      "id": "FEB23-Q5-B",
      "parentId": "FEB23-Q5",
      "session": "February 2023",
      "chapters": [
        4
      ],
      "topic": "Construct a boutique-distribution ERD and propose reports",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Explain TWO reports generated from the ERD.",
      "answer": "Product/SKU catalogue report: product, SKU description, and assigned color.\nRetailer distribution and shipping report: retailer, contracted products, store IDs, and store\naddresses.\nTip: When a child is identified using its parent key plus a local identifier, model it as an existence-\ndependent/weak entity with a composite primary key—for example, (RetailerID, StoreID)."
    },
    {
      "id": "JULY23-Q1-A",
      "parentId": "JULY23-Q1",
      "session": "July 2023",
      "chapters": [
        1,
        2,
        3
      ],
      "topic": "Explain file limitations, data-model building blocks and relational-table violations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain TWO limitations of the file-based approach in a business environment.",
      "answer": "Data redundancy and inconsistency: separate files may store the same fact repeatedly; when only\none copy is changed, different files contain conflicting values.\nStructural/data dependence and weak sharing: programs depend on file layouts, so changes\nrequire program modification and data are difficult to combine across departments."
    },
    {
      "id": "JULY23-Q1-B",
      "parentId": "JULY23-Q1",
      "session": "July 2023",
      "chapters": [
        1,
        2,
        3
      ],
      "topic": "Explain file limitations, data-model building blocks and relational-table violations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Identify and briefly explain any TWO basic building blocks used in data models.",
      "answer": "Entity: a person, place, object, event, or concept about which data are collected and stored; for\nexample, CUSTOMER.\nAttribute: a characteristic that describes an entity; for example, CustomerName or\nCustomerPhone.\nAlternative: Relationship - an association among entities, such as a CUSTOMER\nplaces an ORDER. tive"
    },
    {
      "id": "JULY23-Q1-C-I",
      "parentId": "JULY23-Q1",
      "session": "July 2023",
      "chapters": [
        1,
        2,
        3
      ],
      "topic": "Explain file limitations, data-model building blocks and relational-table violations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE characteristics of a relational table violated by the sample STUDENT table.",
      "answer": "Column names must be distinct. Two columns are both named “Name”, so the attributes are\nambiguous.\nAll values in a column must conform to the same data format/domain. StudID contains numeric\nvalues and an alphanumeric value (2023455abc).\nEach row-column intersection must contain one atomic value. “Modern Dance, Singing” and\n“Modern Dance, Playing Drum” contain multiple skills in one cell."
    },
    {
      "id": "JULY23-Q1-C-II",
      "parentId": "JULY23-Q1",
      "session": "July 2023",
      "chapters": [
        1,
        2,
        3
      ],
      "topic": "Explain file limitations, data-model building blocks and relational-table violations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain a course of action for each violation.",
      "answer": "Rename the two Name columns as FirstName and LastName so every attribute has a unique,\nmeaningful name.\nDefine and enforce a StudID domain/data type and validation rule; reject or correct values that do\nnot follow the required format.\nMove skills to SKILL and STUDENT_SKILL tables so each skill is stored as one atomic value per\nrow.\nTip: For relational-table questions, check eight characteristics systematically: two-dimensional\nstructure, one entity per row, distinct column names, one value per cell, consistent formats, valid domains,\nirrelevant row/column order, and a key that uniquely identifies each row."
    },
    {
      "id": "JULY23-Q2-A",
      "parentId": "JULY23-Q2",
      "session": "July 2023",
      "chapters": [
        1,
        6,
        8
      ],
      "topic": "Explain database-design activities, mobile-database adoption and data structure",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 8,
      "prompt": "Briefly explain FOUR activities in the database design phase of the DBLC.",
      "answer": "Conceptual design: collect requirements, identify entities/attributes/relationships, draw the ERD,\nand normalize the model independently of hardware and DBMS.\nDBMS selection: select suitable DBMS software after considering cost, features, model, portability,\nand hardware requirements.\nLogical design: map the conceptual model to tables, columns, keys, relationships, and constraints\nfor the selected data model; validate it using normalization.\nPhysical design: define storage organization, indexes, access paths, integrity/security measures,\nand performance parameters."
    },
    {
      "id": "JULY23-Q2-B",
      "parentId": "JULY23-Q2",
      "session": "July 2023",
      "chapters": [
        1,
        6,
        8
      ],
      "topic": "Explain database-design activities, mobile-database adoption and data structure",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 8,
      "prompt": "Decide whether a mobile database is suitable for a company with branches in Malaysia and Indonesia,\nand describe THREE factors contributing to its wide usage.",
      "answer": "Suitability: Yes. Staff at dispersed branches can access and update operational data while\ntravelling or working away from the central office, subject to security and synchronization\ncontrols.\nWidespread smartphones/tablets and the mobile wireless revolution create constant demand for\ndata access from geographically dispersed locations.\nInternet, cloud services, and faster networks make remote access and synchronization more\npractical and scalable.\nGlobal/dispersed operations and mobile business intelligence require on-the-spot information\nand faster customer response."
    },
    {
      "id": "JULY23-Q2-C",
      "parentId": "JULY23-Q2",
      "session": "July 2023",
      "chapters": [
        1,
        6,
        8
      ],
      "topic": "Explain database-design activities, mobile-database adoption and data structure",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "State differences between structured and unstructured data.",
      "answer": "Structured data follow a predefined schema and are arranged in fields, rows, and columns; they\nare easy for an RDBMS and SQL to store, validate, and query. Example: CUSTOMER table.\nTip: Do not confuse “database design stages” with SDLC or DBLC phases. For the design phase, the\nfour expected stages are conceptual design, DBMS selection, logical design, and physical design."
    },
    {
      "id": "JULY23-Q3-A",
      "parentId": "JULY23-Q3",
      "session": "July 2023",
      "chapters": [
        5
      ],
      "topic": "Normalize a banquet-reservation form to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "Define normalization and explain its purpose for the banquet reservation form.",
      "answer": "Normalization is the process of evaluating and correcting table structures to minimize data\nredundancy and eliminate data anomalies.\nIt improves integrity and consistency by ensuring that each fact is stored in the correct table and\nupdated in one place.\nIt reduces insertion, update, and deletion anomalies and normally produces well-structured\ntables up to 3NF for business databases."
    },
    {
      "id": "JULY23-Q3-B",
      "parentId": "JULY23-Q3",
      "session": "July 2023",
      "chapters": [
        5
      ],
      "topic": "Normalize a banquet-reservation form to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Describe THREE effects of poor database design.",
      "answer": "Update anomaly: the same menu or facility description is repeated and must be changed in\nseveral rows; missed updates create inconsistency.\nInsertion anomaly: a new menu or facility cannot be stored unless a reservation exists.\nDeletion anomaly: deleting the last reservation using a menu/facility can unintentionally remove\nthe only stored details of that menu/facility."
    },
    {
      "id": "JULY23-Q3-C",
      "parentId": "JULY23-Q3",
      "session": "July 2023",
      "chapters": [
        5
      ],
      "topic": "Normalize a banquet-reservation form to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize the banquet reservation structure to 3NF and identify keys and dependencies.",
      "answer": "UNF and functional dependencies\nKeys and dependencies\nNotation: underlined attribute = primary key; italic attribute with * = foreign key.\n1NF schema: BANQUET_1NF (ReservationID, MenuCode, ReservationDate, CustomerName, Email, Address,\nPhoneNumber, DateOfBanquet, EventType, NumberOfGuests, ArrivalTime, FoodServiceTime, MenuName, MenuDescription,\nQuantity, FacilityCode, FacilityName, FacilityDescription, TotalPayment, PaymentType)\nPrimary key(s)\n• ReservationID + MenuCode (composite primary key).\nFull dependency\n• (ReservationID, MenuCode) -> Quantity\nPartial dependencies\n• ReservationID -> reservation, customer, event, payment and facility attributes\n• MenuCode -> MenuName, MenuDescription\nTransitive dependencies\n• FacilityCode -> FacilityName, FacilityDescription\nNormalization steps\n1NF (First Normal Form)\nEliminate repeating groups, make every attribute atomic, and identify the primary key.\nBANQUET_1NF (ReservationID, MenuCode, ReservationDate, CustomerName, Email, Address, PhoneNumber,\nDateOfBanquet, EventType, NumberOfGuests, ArrivalTime, FoodServiceTime, MenuName, MenuDescription, Quantity,\nFacilityCode, FacilityName, FacilityDescription, TotalPayment, PaymentType) - Store one menu selection per row.\n2NF (Second Normal Form)\nThe relation must be in 1NF. Remove partial dependencies so every non-key attribute depends on the whole composite key.\nRESERVATION_2NF (ReservationID, ReservationDate, CustomerName, Email, Address, PhoneNumber, DateOfBanquet,\nEventType, NumberOfGuests, ArrivalTime, FoodServiceTime, FacilityCode, FacilityName, FacilityDescription, TotalPayment,\nPaymentType) - Removes attributes dependent only on ReservationID.\nMENU (MenuCode, MenuName, MenuDescription) - Removes attributes dependent only on MenuCode.\nRESERVATION_MENU (ReservationID*, MenuCode*, Quantity) - Quantity depends on the whole key.\n3NF (Third Normal Form)\nThe relations must be in 2NF. Remove transitive dependencies so non-key attributes depend on nothing but the key.\nFACILITY (FacilityCode, FacilityName, FacilityDescription) - Removes the facility transitive dependency.\nRESERVATION (ReservationID, ReservationDate, CustomerName, Email, Address, PhoneNumber, DateOfBanquet,\nEventType, NumberOfGuests, ArrivalTime, FoodServiceTime, FacilityCode*, TotalPayment, PaymentType) - Contains\nreservation facts and references FACILITY.\nMENU (MenuCode, MenuName, MenuDescription) - Remains in 3NF.\nRESERVATION_MENU (ReservationID*, MenuCode*, Quantity) - Final associative relation.\nTip: For a form containing a repeating list, begin with the transaction identifier plus the repeating-\nitem identifier as the 1NF composite key. Then test which attributes depend on only one part of that key.\nAssumption: customer details are treated as reservation facts because the source provides no stable CustomerID."
    },
    {
      "id": "JULY23-Q4-A",
      "parentId": "JULY23-Q4",
      "session": "July 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Create the APPLYLOAN table.",
      "answer": "Access SQL using explicit JOIN\nCREATE TABLE APPLYLOAN (\nClientNum TEXT(20) NOT NULL,\nLoanID TEXT(20) NOT NULL,\nLoanTotal CURRENCY NOT NULL,\nLoanRemainder CURRENCY,\nLoanDate DATETIME NOT NULL,\nCONSTRAINT PK_APPLYLOAN PRIMARY KEY (ClientNum, LoanID),\nCONSTRAINT FK_APPLYLOAN_CLIENT FOREIGN KEY (ClientNum)\nREFERENCES CLIENT (ClientNum),\nCONSTRAINT FK_APPLYLOAN_LOAN FOREIGN KEY (LoanID)\nREFERENCES LOAN (LoanID)\n);\nAlternative Access SQL\nCREATE TABLE APPLYLOAN (\nClientNum TEXT(20) NOT NULL,\nLoanID TEXT(20) NOT NULL,\nLoanTotal CURRENCY NOT NULL,\nLoanRemainder CURRENCY,\nLoanDate DATETIME NOT NULL,\nPRIMARY KEY (ClientNum, LoanID),\nFOREIGN KEY (ClientNum) REFERENCES CLIENT (ClientNum),\nFOREIGN KEY (LoanID) REFERENCES LOAN (LoanID)\n);"
    },
    {
      "id": "JULY23-Q4-B",
      "parentId": "JULY23-Q4",
      "session": "July 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Using a subquery, list client names that make a personal loan.",
      "answer": "Access SQL using explicit JOIN\nSELECT ClientName\nFROM CLIENT\nWHERE ClientNum IN (\nSELECT ClientNum\nFROM APPLYLOAN\nWHERE LoanID IN (\nSELECT LoanID\nFROM LOAN\nWHERE LoanType = 'Personal Loan'\n)\n);\nAlternative Access SQL\nSELECT ClientName\nFROM CLIENT\nWHERE ClientNum IN\n(SELECT ClientNum\nFROM APPLYLOAN\nWHERE LoanID IN\n(SELECT LoanID\nFROM LOAN\nWHERE LoanType = 'Personal Loan'));"
    },
    {
      "id": "JULY23-Q4-C",
      "parentId": "JULY23-Q4",
      "session": "July 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Generate the total loan from 2021 until 2023.",
      "answer": "Access SQL using explicit JOIN\nSELECT Sum(LoanTotal) AS [Total Loan]\nFROM APPLYLOAN\nWHERE LoanDate >= #2021-01-01#\nAND LoanDate < #2024-01-01#;\nAlternative Access SQL\nSELECT Sum(LoanTotal) AS [Total Loan]\nFROM APPLYLOAN\nWHERE LoanDate >= #2021-01-01# AND LoanDate < #2024-01-01#;"
    },
    {
      "id": "JULY23-Q4-D",
      "parentId": "JULY23-Q4",
      "session": "July 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "List officers who manage housing loans and are from the Finance department.",
      "answer": "Access SQL using explicit JOIN\nSELECT DISTINCT O.StaffName\nFROM (OFFICER AS O\nINNER JOIN DEPARTMENT AS D ON O.DeptID = D.DeptID)\nINNER JOIN LOAN AS L ON O.StaffID = L.StaffID\nWHERE L.LoanType = 'Housing Loan'\nAND D.DeptName = 'Finance';\nAlternative Access SQL\nSELECT DISTINCT O.StaffName\nFROM OFFICER O, DEPARTMENT D, LOAN L\nWHERE O.DeptID = D.DeptID\nAND O.StaffID = L.StaffID\nAND L.LoanType = 'Housing Loan'\nAND D.DeptName = 'Finance';"
    },
    {
      "id": "JULY23-Q4-E",
      "parentId": "JULY23-Q4",
      "session": "July 2023",
      "chapters": [
        7
      ],
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Generate the total loan for each loan type.",
      "answer": "Access SQL using explicit JOIN\nSELECT L.LoanType, Sum(A.LoanTotal) AS [Total Loan]\nFROM LOAN AS L\nINNER JOIN APPLYLOAN AS A ON L.LoanID = A.LoanID\nGROUP BY L.LoanType;\nAlternative Access SQL\nSELECT L.LoanType,\nSum(A.LoanTotal) AS [Total Loan]\nFROM LOAN L, APPLYLOAN A\nWHERE L.LoanID = A.LoanID\nGROUP BY L.LoanType;\nTip: SQL is marked line by line. Even if unsure, write at least one correct line. Start with\nSELECT/CREATE/UPDATE, then add FROM, WHERE/JOIN, GROUP BY, HAVING, or ORDER BY. Each correct\nline can earn a mark; never leave SQL blank."
    },
    {
      "id": "JULY23-Q5-A",
      "parentId": "JULY23-Q5",
      "session": "July 2023",
      "chapters": [
        4
      ],
      "topic": "Construct a hiking-agency ERD and propose reports",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct a Crow's Foot ERD for the hiking-agency database.",
      "answer": "The ERD below uses direct Crow's Foot symbols at every relationship end: a circle means optional (minimum 0), a bar means\none, and the crow's foot means many. Read the two ends together to determine connectivity and cardinality.\nEntity and key checklist\nEntity / required key structure\nHIKER, FAMILY_MEMBER, TRIP, GUIDE, and MOUNTAIN with suitable PKs and all stated\nattributes.\nHIKER_TRIP resolves HIKER M:N TRIP and stores HikeStartDate and HikeEndDate.\nTRIP_GUIDE resolves TRIP M:N GUIDE and stores Payment.\nRelationship and cardinality checklist\nRequired relationship\nHIKER 1 : 0..M FAMILY_MEMBER.\nHIKER M:N TRIP through HIKER_TRIP.\nTRIP 1..M : 0..M GUIDE through TRIP_GUIDE; every trip has at least one guide.\nMOUNTAIN 1 : 0..M TRIP; every trip has exactly one mountain destination.\nCorrect Crow's Foot cardinality, PK/FK placement, and readable model."
    },
    {
      "id": "JULY23-Q5-B",
      "parentId": "JULY23-Q5",
      "session": "July 2023",
      "chapters": [
        4
      ],
      "topic": "Construct a hiking-agency ERD and propose reports",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Explain TWO reports that can be generated.",
      "answer": "Trip participant report: trip name, mountain, hike dates, and the hikers registered for each trip.\nGuide assignment/payment report: each guide, assigned trips, and payment for each trip.\nAlternative: hiker emergency-contact report or mountain/trip schedule report.\nTip: Every M:N relationship must be resolved with an associative entity. Place relationship\nattributes, such as Payment or HikeStartDate, in that associative entity—not in either parent table."
    },
    {
      "id": "JAN24-Q1-A",
      "parentId": "JAN24-Q1",
      "session": "January 2024",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain data/database, inconsistency, relationship redesign and maintenance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain the meaning of data and database.",
      "answer": "Data are raw facts or the building blocks of information; they must be processed and placed in\ncontext to reveal meaning.\nA database is a shared, integrated computer structure that stores end-user data together with\nmetadata describing data characteristics and relationships."
    },
    {
      "id": "JAN24-Q1-B",
      "parentId": "JAN24-Q1",
      "session": "January 2024",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain data/database, inconsistency, relationship redesign and maintenance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain data inconsistency and illustrate one example.",
      "answer": "Data inconsistency occurs when different copies of the same fact contain conflicting values,\nusually because redundant data were not updated everywhere.\nExample: a customer changes address; the SALES file shows the new address while the DELIVERY\nfile still shows the old address."
    },
    {
      "id": "JAN24-Q1-C",
      "parentId": "JAN24-Q1",
      "session": "January 2024",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain data/database, inconsistency, relationship redesign and maintenance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "State the Customers-Orders-Products design problem and illustrate an ERD solution.",
      "answer": "Problem: ORDERS and PRODUCTS have an M:N relationship—one order contains many products\nand one product appears in many orders. Directly linking the two causes repeating groups,\nredundancy, and difficult relational operations.\nSolution: add ORDER_DETAIL as an associative entity with composite PK/FKs (OrderID, ProductID)\nand relationship attributes such as Quantity and SalePrice.\nCUSTOMER 1:M ORDERS; ORDERS 1:M ORDER_DETAIL; PRODUCT 1:M ORDER_DETAIL."
    },
    {
      "id": "JAN24-Q1-D",
      "parentId": "JAN24-Q1",
      "session": "January 2024",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain data/database, inconsistency, relationship redesign and maintenance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE types of maintenance in the SDLC.",
      "answer": "Corrective maintenance: fixes errors or defects discovered during operation.\nAdaptive maintenance: modifies the system for changes in business rules, hardware, software,\nlaw, or operating environment.\nPreventive maintenance: performs planned changes, tuning, cleanup, and documentation to\nreduce future failures and improve reliability.\nTip: An M:N relationship is never implemented directly in a relational database. Resolve it with a\nbridge/associative table whose primary key normally combines the two parent keys."
    },
    {
      "id": "JAN24-Q2-A",
      "parentId": "JAN24-Q2",
      "session": "January 2024",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain conceptual models, integrity, design stages and Big Data reliance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO advantages of the conceptual model for a business environment.",
      "answer": "It provides an easily understood global, macro-level view that integrates all user views, entities,\nrelationships, and constraints for the whole organization.\nIt is independent of both DBMS software and hardware, so technology changes do not change the\nconceptual business design."
    },
    {
      "id": "JAN24-Q2-B",
      "parentId": "JAN24-Q2",
      "session": "January 2024",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain conceptual models, integrity, design stages and Big Data reliance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Determine entity-integrity and referential-integrity violations in BOOKS and PUBLISHERS.",
      "answer": "BOOKS violates entity integrity because ISBN 978-981-4824-24-7 appears twice. If ISBN is the PK,\nevery ISBN must be unique and non-null.\nReferential integrity is not violated by the shown non-null PublisherID values: 101, 102, and 103\nexist in PUBLISHERS. The blank PublisherID is allowed only when the relationship is optional and\nthe FK is not part of the PK; otherwise it violates the business rule/NOT NULL constraint.\nPUBLISHERS does not violate entity integrity: PublisherID values 101-104 are unique and non-\nnull. An unreferenced parent row such as 104 is valid."
    },
    {
      "id": "JAN24-Q2-C",
      "parentId": "JAN24-Q2",
      "session": "January 2024",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain conceptual models, integrity, design stages and Big Data reliance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Fill the database-design-process stages and dependency labels.",
      "answer": "i) Conceptual design\nii) DBMS selection\niii) Logical design\niv) Physical design\nv) DBMS- and hardware-independent\nvi) Hardware-dependent"
    },
    {
      "id": "JAN24-Q2-D",
      "parentId": "JAN24-Q2",
      "session": "January 2024",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain conceptual models, integrity, design stages and Big Data reliance",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Describe THREE factors that contribute to increasing reliance on Big Data.",
      "answer": "Volume: online transactions, social media, and digital services generate extremely large\nquantities of data.\nVelocity: mobile devices, sensors, RFID/GPS/NFC, and web events produce data continuously and\nrequire rapid or real-time processing.\nVariety: organizations now use structured tables together with text, images, audio, video,\nclickstreams, and other semistructured/unstructured sources.\nTip: Keep data abstraction and design stages separate. External is the user/business view;\nconceptual, internal/logical, and physical are progressively more detailed designer views."
    },
    {
      "id": "JAN24-Q3-A",
      "parentId": "JAN24-Q3",
      "session": "January 2024",
      "chapters": [
        5
      ],
      "topic": "Normalize an employee-evaluation report to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "State the normal form of the employee evaluation report and explain.",
      "answer": "The report is UNF (0NF) because employee details appear once while a repeating\nproject/evaluation group appears underneath them.\nThe same employee can have many project rows, so the form must first be flattened into one\natomic employee-project-location row."
    },
    {
      "id": "JAN24-Q3-B",
      "parentId": "JAN24-Q3",
      "session": "January 2024",
      "chapters": [
        5
      ],
      "topic": "Normalize an employee-evaluation report to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Convert the report to a relational schema and identify keys/dependencies.",
      "answer": "Keys and dependencies\nLocation is retained in the composite key because the same employee-project combination appears at more than one location\nin the source report.\nNotation: underlined attribute = primary key; italic attribute with * = foreign key.\n1NF schema: EMP_EVALUATION_1NF (EmployeeID, ProjectCode, Location, EmployeeName, EmploymentYear,\nDepartmentID, DepartmentName, PhoneNumber, PermanentAddress, ProjectName, Grade, SupervisorID, SupervisorName,\nSupervisorDepartmentID, SupervisorDepartmentName)\nPrimary key(s)\n• EmployeeID + ProjectCode + Location (composite primary key).\nFull dependency\n• (EmployeeID, ProjectCode, Location) -> Grade\nPartial dependencies\n• EmployeeID -> EmployeeName, EmploymentYear, DepartmentID, PhoneNumber, PermanentAddress\n• ProjectCode -> ProjectName, SupervisorID\nTransitive dependencies\n• DepartmentID -> DepartmentName\n• SupervisorID -> SupervisorName, SupervisorDepartmentID\n• SupervisorDepartmentID -> SupervisorDepartmentName"
    },
    {
      "id": "JAN24-Q3-C",
      "parentId": "JAN24-Q3",
      "session": "January 2024",
      "chapters": [
        5
      ],
      "topic": "Normalize an employee-evaluation report to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize the schema to 3NF.",
      "answer": "Normalization steps\n1NF (First Normal Form)\nEliminate repeating groups, make every attribute atomic, and identify the primary key.\nEMP_EVALUATION_1NF (EmployeeID, ProjectCode, Location, EmployeeName, EmploymentYear, DepartmentID,\nDepartmentName, PhoneNumber, PermanentAddress, ProjectName, Grade, SupervisorID, SupervisorName,\nSupervisorDepartmentID, SupervisorDepartmentName) - One atomic employee-project-location evaluation row.\n2NF (Second Normal Form)\nThe relation must be in 1NF. Remove partial dependencies so every non-key attribute depends on the whole composite key.\nEMPLOYEE_2NF (EmployeeID, EmployeeName, EmploymentYear, DepartmentID, DepartmentName, PhoneNumber,\nPermanentAddress) - Removes the EmployeeID partial dependency.\nPROJECT_2NF (ProjectCode, ProjectName, SupervisorID, SupervisorName, SupervisorDepartmentID,\nSupervisorDepartmentName) - Removes the ProjectCode partial dependency.\nPROJECT_EVALUATION (EmployeeID*, ProjectCode*, Location, Grade) - Grade depends on the whole key.\n3NF (Third Normal Form)\nThe relations must be in 2NF. Remove transitive dependencies so non-key attributes depend on nothing but the key.\nDEPARTMENT (DepartmentID, DepartmentName) - Stores each department once.\nEMPLOYEE (EmployeeID, EmployeeName, EmploymentYear, DepartmentID*, PhoneNumber, PermanentAddress) - Employee\ndepartment is referenced by FK.\nPROJECT (ProjectCode, ProjectName, SupervisorID*) - SupervisorID references EMPLOYEE.\nPROJECT_EVALUATION (EmployeeID*, ProjectCode*, Location, Grade) - Final evaluation relation.\nTip: When the same employee-project combination appears more than once, confirm the real\ntransaction grain. Here, Location is required in the composite key unless an EvaluationID is introduced."
    },
    {
      "id": "JAN24-Q4-A",
      "parentId": "JAN24-Q4",
      "session": "January 2024",
      "chapters": [
        7
      ],
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display movies released from 2021 until 2023.",
      "answer": "Access SQL using explicit JOIN\nSELECT *\nFROM MOVIE\nWHERE DateRelease >= #2021-01-01#\nAND DateRelease < #2024-01-01#;\nAlternative Access SQL\nSELECT *\nFROM MOVIE\nWHERE DateRelease >= #2021-01-01# AND DateRelease < #2024-01-01#;"
    },
    {
      "id": "JAN24-Q4-B",
      "parentId": "JAN24-Q4",
      "session": "January 2024",
      "chapters": [
        7
      ],
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify the total movies directed by Malaysian directors.",
      "answer": "Access SQL using explicit JOIN\nSELECT Count(M.MovieID) AS [Total Movies]\nFROM DIRECTOR AS D\nINNER JOIN MOVIE AS M ON D.DirectorID = M.DirectorID\nWHERE D.Nationality = 'Malaysian';\nAlternative Access SQL\nSELECT Count(M.MovieID) AS [Total Movies]\nFROM DIRECTOR D, MOVIE M\nWHERE D.DirectorID = M.DirectorID\nAND D.Nationality = 'Malaysian';"
    },
    {
      "id": "JAN24-Q4-C",
      "parentId": "JAN24-Q4",
      "session": "January 2024",
      "chapters": [
        7
      ],
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Calculate average net profit for each genre as “Average Net Profit”.",
      "answer": "Access SQL using explicit JOIN\nSELECT Genre, Avg(NetProfit) AS [Average Net Profit]\nFROM MOVIE\nGROUP BY Genre;\nAlternative Access SQL\nSELECT Genre, Avg(NetProfit) AS [Average Net Profit]\nFROM MOVIE\nGROUP BY Genre;"
    },
    {
      "id": "JAN24-Q4-D",
      "parentId": "JAN24-Q4",
      "session": "January 2024",
      "chapters": [
        7
      ],
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify reviewers who made more than two reviews.",
      "answer": "Access SQL using explicit JOIN\nSELECT R.ReviewerName, Count(V.ReviewID) AS [Total Reviews]\nFROM REVIEWER AS R\nINNER JOIN REVIEW AS V ON R.ReviewerID = V.ReviewerID\nGROUP BY R.ReviewerID, R.ReviewerName\nHAVING Count(V.ReviewID) > 2;\nAlternative Access SQL\nSELECT R.ReviewerName,\nCount(V.ReviewID) AS [Total Reviews]\nFROM REVIEWER R, REVIEW V\nWHERE R.ReviewerID = V.ReviewerID\nGROUP BY R.ReviewerID, R.ReviewerName\nHAVING Count(V.ReviewID) > 2;"
    },
    {
      "id": "JAN24-Q4-E",
      "parentId": "JAN24-Q4",
      "session": "January 2024",
      "chapters": [
        7
      ],
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display the movie that received the most reviews.",
      "answer": "Access SQL - complete model answer\nSELECT TOP 1 M.MovieID, M.MovieName, Count(R.ReviewID) AS [Total Reviews]\nFROM MOVIE AS M INNER JOIN REVIEW AS R ON M.MovieID = R.MovieID\nGROUP BY M.MovieID, M.MovieName\nORDER BY Count(R.ReviewID) DESC;"
    },
    {
      "id": "JAN24-Q5-A",
      "parentId": "JAN24-Q5",
      "session": "January 2024",
      "chapters": [
        4
      ],
      "topic": "Construct an auxiliary-police ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct the auxiliary-police Crow's Foot ERD.",
      "answer": "The ERD below uses direct Crow's Foot symbols at every relationship end: a circle means optional (minimum 0), a bar means\none, and the crow's foot means many. Read the two ends together to determine connectivity and cardinality.\nEntity and key checklist\nEntity / required key structure\nPOLICE_OFFICER, DUTY, STUDENT, SUMMON, and OFFENSE with stated attributes and suitable\nPKs.\nOFFICER_DUTY resolves the M:N officer-duty assignment and stores duty date/time.\nSUMMON_OFFENSE resolves the M:N summon-offense relationship.\nRelationship and cardinality checklist\nRequired relationship\nPOLICE_OFFICER M:N DUTY through OFFICER_DUTY; each duty has more than one officer.\nPOLICE_OFFICER 1:M SUMMON and STUDENT 1:M SUMMON.\nSUMMON M:N OFFENSE through SUMMON_OFFENSE; each summon contains more than one\noffense.\nCorrect PK/FK/cardinality and readable Crow's Foot notation."
    },
    {
      "id": "JAN24-Q5-B",
      "parentId": "JAN24-Q5",
      "session": "January 2024",
      "chapters": [
        4
      ],
      "topic": "Construct an auxiliary-police ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify TWO relevant reports/information outputs.",
      "answer": "Duty roster report by duty date/time, showing assigned officers and duty type.\nSummons report by student, issue date, offense details, and total fees.\nTip: Attributes describing an assignment—such as DutyDate and DutyTime—belong in the\nassociative OFFICER_DUTY entity because they describe the relationship, not the officer or duty alone."
    },
    {
      "id": "JULY24-Q1-A",
      "parentId": "JULY24-Q1",
      "session": "July 2024",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain DBMS functions/applications, diagnose table problems and compare design locations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain TWO DBMS functions that guarantee integrity and consistency.",
      "answer": "Data integrity management: defines, promotes, and enforces entity, referential, domain, and\nbusiness rules so invalid values or relationships are rejected.\nMulti-user access/concurrency control: coordinates simultaneous access and updates so users do\nnot overwrite one another or leave inconsistent data."
    },
    {
      "id": "JULY24-Q1-B",
      "parentId": "JULY24-Q1",
      "session": "July 2024",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain DBMS functions/applications, diagnose table problems and compare design locations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Identify FOUR examples of database application usage.",
      "answer": "Booking a holiday at a travel agency.\nRecording supermarket purchases.\nUsing a local library system.\nManaging university/student records.\nAlternatives from the notes: using the internet or renting a video."
    },
    {
      "id": "JULY24-Q1-C",
      "parentId": "JULY24-Q1",
      "session": "July 2024",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain DBMS functions/applications, diagnose table problems and compare design locations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Identify and justify THREE problems in the MENU table.",
      "answer": "Bihun Goreng has no MenuCode, violating entity integrity because the row cannot be uniquely\nidentified by the intended key.\nNasi Ayam has a missing Price, so the row is incomplete and AVG may ignore the null, producing\nan unreliable result.\nLaksa has “2.SO” instead of a numeric value such as 2.50, violating the Price domain/data type\nand preventing numeric aggregation."
    },
    {
      "id": "JULY24-Q1-D",
      "parentId": "JULY24-Q1",
      "session": "July 2024",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain DBMS functions/applications, diagnose table problems and compare design locations",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE differences between centralized and decentralized database design.",
      "answer": "Scope/complexity: centralized design suits a relatively small number of objects and simple\nprocedures; decentralized design suits many entities, complex relationships, and complex\noperations.\nDesign organization: centralized design is completed by one DBA or a small team; decentralized\ndesign divides the system into modules handled by several design groups.\nIntegration: centralized design produces and validates one conceptual model directly;\ndecentralized design creates separate module models and then aggregates them, resolving\nsynonyms, homonyms, and conflicting definitions.\nTip: Centralized/decentralized design is a design philosophy. Centralized/distributed database is a\nlocation classification. Use the wording of the question to choose the correct comparison."
    },
    {
      "id": "JULY24-Q2-A",
      "parentId": "JULY24-Q2",
      "session": "July 2024",
      "chapters": [
        2,
        4,
        8
      ],
      "topic": "Match data models, derive business rules, and explain security and multimedia challenges",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Match each data model to the correct statement.",
      "answer": "Hierarchical -> Parent/child relationship promotes data integrity.\nNetwork -> Handles more relationship types, including M:N and multiparent relationships.\nRelational -> May promote islands of information when individuals/departments easily develop\nseparate applications.\nEntity Relationship -> Visual representation makes it an effective communication tool."
    },
    {
      "id": "JULY24-Q2-B",
      "parentId": "JULY24-Q2",
      "session": "July 2024",
      "chapters": [
        2,
        4,
        8
      ],
      "topic": "Match data models, derive business rules, and explain security and multimedia challenges",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO business rules from the PETS-CUSTOMERS-PURCHASES schema.",
      "answer": "One CUSTOMER may make zero or many PURCHASES; each PURCHASE must belong to one\nCUSTOMER through CustomerID.\nOne PURCHASE may include one or many PETS; each sold PET belongs to one PURCHASE through\nPurchaseID, while an unsold pet may have a null PurchaseID if participation is optional."
    },
    {
      "id": "JULY24-Q2-C",
      "parentId": "JULY24-Q2",
      "session": "July 2024",
      "chapters": [
        2,
        4,
        8
      ],
      "topic": "Match data models, derive business rules, and explain security and multimedia challenges",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Describe THREE reasons for protecting data from unauthorized users.",
      "answer": "Confidentiality/privacy: prevent disclosure of personal, financial, or organizational information to\npeople without access rights.\nIntegrity: prevent unauthorized modification, deletion, or insertion that could make records\ninaccurate or fraudulent.\nAvailability and accountability: reduce disruption/data loss and use access controls/audit trails so\nactions can be traced and services remain reliable."
    },
    {
      "id": "JULY24-Q2-D",
      "parentId": "JULY24-Q2",
      "session": "July 2024",
      "chapters": [
        2,
        4,
        8
      ],
      "topic": "Match data models, derive business rules, and explain security and multimedia challenges",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE challenges of multimedia data compared with traditional structured data.",
      "answer": "Large storage volume: images, audio, and video files are much larger than ordinary numeric/text\nfields and require more storage and backup capacity.\nVaried/unstructured formats: multimedia do not fit naturally into fixed rows and columns,\nmaking metadata design, validation, indexing, and content searching more difficult.\nHigh processing and network demand: retrieval, streaming, compression, and remote access\nrequire more CPU, memory, and bandwidth and may produce latency.\nTip: For “challenges” questions, state the challenge and then its database effect. Example: “large file\nsize -> higher storage, backup, and network cost.”"
    },
    {
      "id": "JULY24-Q3-A",
      "parentId": "JULY24-Q3",
      "session": "July 2024",
      "chapters": [
        5
      ],
      "topic": "Normalize a sales invoice to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "State the normal form of the Sasa eStore invoice and explain.",
      "answer": "The invoice layout is UNF (0NF) because the item section is a repeating group inside one invoice.\nA line identifier is also absent; the same item appears twice, so an invoice-item row cannot be\nuniquely identified without LineNo or aggregation."
    },
    {
      "id": "JULY24-Q3-B",
      "parentId": "JULY24-Q3",
      "session": "July 2024",
      "chapters": [
        5
      ],
      "topic": "Normalize a sales invoice to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Identify the primary key(s), partial dependencies, and transitive dependencies.",
      "answer": "Keys and dependencies\nLineNo and ProductID are introduced because the invoice does not provide a unique line identifier or product code; the same\nproduct appears more than once.\nNotation: underlined attribute = primary key; italic attribute with * = foreign key.\n1NF schema: INVOICE_LINE_1NF (InvoiceNo, LineNo, InvoiceDate, MemberID, MemberName, MemberAddress, ProductID,\nProductName, Quantity, UnitPrice, Amount, Total, PaidAmount, BalanceDue)\nPrimary key(s)\n• InvoiceNo + LineNo (composite primary key).\nFull dependency\n• (InvoiceNo, LineNo) -> ProductID, Quantity\nPartial dependencies\n• InvoiceNo -> InvoiceDate, MemberID, Total, PaidAmount, BalanceDue\nTransitive dependencies\n• MemberID -> MemberName, MemberAddress\n• ProductID -> ProductName, UnitPrice"
    },
    {
      "id": "JULY24-Q3-C",
      "parentId": "JULY24-Q3",
      "session": "July 2024",
      "chapters": [
        5
      ],
      "topic": "Normalize a sales invoice to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize the invoice from 1NF to 3NF.",
      "answer": "Normalization steps\n1NF (First Normal Form)\nEliminate repeating groups, make every attribute atomic, and identify the primary key.\nINVOICE_LINE_1NF (InvoiceNo, LineNo, InvoiceDate, MemberID, MemberName, MemberAddress, ProductID, ProductName,\nQuantity, UnitPrice, Amount, Total, PaidAmount, BalanceDue) - One atomic invoice line per row; LineNo distinguishes duplicate\nproduct lines.\n2NF (Second Normal Form)\nThe relation must be in 1NF. Remove partial dependencies so every non-key attribute depends on the whole composite key.\nINVOICE_2NF (InvoiceNo, InvoiceDate, MemberID, MemberName, MemberAddress, Total, PaidAmount, BalanceDue) -\nRemoves attributes dependent only on InvoiceNo.\nINVOICE_LINE_2NF (InvoiceNo*, LineNo, ProductID, ProductName, Quantity, UnitPrice, Amount) - Keeps facts that describe a\nspecific line; product details are still transitive.\n3NF (Third Normal Form)\nThe relations must be in 2NF. Remove transitive dependencies so non-key attributes depend on nothing but the key.\nMEMBER (MemberID, MemberName, MemberAddress) - Removes MemberID -> member details.\nPRODUCT (ProductID, ProductName, UnitPrice) - Removes ProductID -> product details.\nINVOICE (InvoiceNo, InvoiceDate, MemberID*, Total, PaidAmount, BalanceDue) - References MEMBER.\nINVOICE_LINE (InvoiceNo*, LineNo, ProductID*, Quantity) - References PRODUCT; Amount is derived as Quantity x UnitPrice.\nTip: Invoice totals, line amounts, and balances are derived attributes. In a clean schema they can be\ncalculated from stored facts; if stored for audit/performance, label and control them carefully."
    },
    {
      "id": "JULY24-Q4-A",
      "parentId": "JULY24-Q4",
      "session": "July 2024",
      "chapters": [
        7
      ],
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Calculate the total candidates for each faculty.",
      "answer": "Access SQL using explicit JOIN\nSELECT F.FacultyID, F.FacultyName,\nCount(C.CandidateID) AS [Total Candidates]\nFROM (FACULTY AS F\nINNER JOIN STUDENT AS S ON F.FacultyID = S.FacultyID)\nINNER JOIN CANDIDATE AS C ON S.StudentID = C.StudentID\nGROUP BY F.FacultyID, F.FacultyName;\nAlternative Access SQL\nSELECT F.FacultyID, F.FacultyName,\nCount(C.CandidateID) AS [Total Candidates]\nFROM FACULTY F, STUDENT S, CANDIDATE C\nWHERE F.FacultyID = S.FacultyID\nAND S.StudentID = C.StudentID\nGROUP BY F.FacultyID, F.FacultyName;"
    },
    {
      "id": "JULY24-Q4-B",
      "parentId": "JULY24-Q4",
      "session": "July 2024",
      "chapters": [
        7
      ],
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display students who did not vote for any candidate.",
      "answer": "Access SQL using explicit JOIN\nSELECT S.*\nFROM STUDENT AS S\nLEFT JOIN VOTING AS V ON S.StudentID = V.StudID\nWHERE V.VotingID IS NULL;\nAlternative Access SQL\nSELECT S.*\nFROM STUDENT S\nWHERE S.StudentID NOT IN\n(SELECT StudID\nFROM VOTING);"
    },
    {
      "id": "JULY24-Q4-C",
      "parentId": "JULY24-Q4",
      "session": "July 2024",
      "chapters": [
        7
      ],
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify the total voters for each faculty.",
      "answer": "Access SQL using explicit JOIN\nSELECT F.FacultyID, F.FacultyName,\nCount(V.VotingID) AS [Total Voters]\nFROM (FACULTY AS F\nINNER JOIN STUDENT AS S ON F.FacultyID = S.FacultyID)\nINNER JOIN VOTING AS V ON S.StudentID = V.StudID\nGROUP BY F.FacultyID, F.FacultyName;\nAlternative Access SQL\nSELECT F.FacultyID, F.FacultyName,\nCount(V.VotingID) AS [Total Voters]\nFROM FACULTY F, STUDENT S, VOTING V\nWHERE F.FacultyID = S.FacultyID\nAND S.StudentID = V.StudID\nGROUP BY F.FacultyID, F.FacultyName;"
    },
    {
      "id": "JULY24-Q4-D",
      "parentId": "JULY24-Q4",
      "session": "July 2024",
      "chapters": [
        7
      ],
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display full names of candidates receiving more than 500 votes.",
      "answer": "Access SQL using explicit JOIN\nSELECT S.FirstName & ' ' & S.LastName AS [Candidate Name],\nCount(VD.VotingID) AS [Total Votes]\nFROM (CANDIDATE AS C\nINNER JOIN STUDENT AS S ON C.StudentID = S.StudentID)\nINNER JOIN VOTING_DETAILS AS VD ON C.CandidateID = VD.CandidateID\nGROUP BY C.CandidateID, S.FirstName, S.LastName\nHAVING Count(VD.VotingID) > 500;\nAlternative Access SQL\nSELECT S.FirstName & ' ' & S.LastName AS [Candidate Name],\nCount(VD.VotingID) AS [Total Votes]\nFROM CANDIDATE C, STUDENT S, VOTING_DETAILS VD\nWHERE C.StudentID = S.StudentID\nAND C.CandidateID = VD.CandidateID\nGROUP BY C.CandidateID, S.FirstName, S.LastName\nHAVING Count(VD.VotingID) > 500;"
    },
    {
      "id": "JULY24-Q4-E",
      "parentId": "JULY24-Q4",
      "session": "July 2024",
      "chapters": [
        7
      ],
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify the total students who voted for only one candidate.",
      "answer": "Access SQL using explicit JOIN\nSELECT Count(*) AS [Total Students]\nFROM (\nSELECT V.StudID\nFROM VOTING AS V\nINNER JOIN VOTING_DETAILS AS VD ON V.VotingID = VD.VotingID\nGROUP BY V.StudID\nHAVING Count(VD.CandidateID) = 1\n) AS X;\nAlternative Access SQL\n-- Query 1: identify students who selected exactly one candidate.\nSELECT V.StudID\nFROM VOTING V, VOTING_DETAILS VD\nWHERE V.VotingID = VD.VotingID\nGROUP BY V.StudID\nHAVING Count(VD.CandidateID) = 1;\n-- Save Query 1 as Q_OneCandidateVoters.\n-- Query 2: count the saved rows.\nSELECT Count(StudID) AS [Total Students]\nFROM Q_OneCandidateVoters;\nAccess note: Use the complete Access SQL answer shown above; a saved-query sequence is acceptable when it returns the same result.\nTip: SQL answers are marked line by line. Even when you are unsure, write at least one correct line.\nStart with SELECT (or CREATE/UPDATE), then add FROM, WHERE or JOIN, GROUP BY, HAVING, and\nORDER BY as far as you can. Each correct line may earn a mark, so do not leave the SQL answer blank.\nTechnical note: In Microsoft Access, LEFT JOIN plus IS NULL is suitable for finding records with no match."
    },
    {
      "id": "JULY24-Q5-A",
      "parentId": "JULY24-Q5",
      "session": "July 2024",
      "chapters": [
        4
      ],
      "topic": "Construct a football-tournament ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct the football-tournament Crow's Foot ERD.",
      "answer": "The ERD below uses direct Crow's Foot symbols at every relationship end: a circle means optional (minimum 0), a bar means\none, and the crow's foot means many. Read the two ends together to determine connectivity and cardinality.\nEntity and key checklist\nEntity / required key structure\nTOURNAMENT, TEAM, PLAYER, FIXTURE, MATCH, and VENUE with all stated attributes and PKs.\nTOURNAMENT_TEAM resolves participation of teams in tournaments.\nMATCH includes FixtureID, VenueID, HomeTeamID, and AwayTeamID as FKs.\nRelationship and cardinality checklist\nRequired relationship\nTOURNAMENT M:N TEAM through TOURNAMENT_TEAM.\nTEAM 1:M PLAYER; each player belongs to exactly one team.\nTOURNAMENT 1:M FIXTURE and FIXTURE 1:M MATCH.\nVENUE 1:M MATCH; TEAM participates twice in MATCH as home and away roles."
    },
    {
      "id": "JULY24-Q5-B",
      "parentId": "JULY24-Q5",
      "session": "July 2024",
      "chapters": [
        4
      ],
      "topic": "Construct a football-tournament ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify FOUR relevant information outputs.",
      "answer": "Tournament fixture schedule with kick-off times and match dates.\nTeams participating in each tournament.\nPlayer roster for each team.\nMatch results with home team, away team, and venue.\nTip: When the same entity participates twice in one relationship, label the roles clearly. MATCH has\ntwo FKs to TEAM: HomeTeamID and AwayTeamID."
    },
    {
      "id": "FEB25-Q1-A",
      "parentId": "FEB25-Q1",
      "session": "February 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain data, spreadsheet differences, referential-integrity rules and design strategies",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Identify FOUR examples of data for an online store.",
      "answer": "CustomerID or customer name.\nProductID or product name.\nUnit price or quantity ordered.\nOrder date or payment method."
    },
    {
      "id": "FEB25-Q1-B",
      "parentId": "FEB25-Q1",
      "session": "February 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain data, spreadsheet differences, referential-integrity rules and design strategies",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO differences between a database and a spreadsheet.",
      "answer": "A database uses related tables, keys, relationships, and a DBMS; a spreadsheet is primarily a\ngrid/worksheet and is commonly flat or copied into separate files.\nA DBMS provides integrity constraints, controlled multi-user access, security, and powerful\nrelational queries; spreadsheet controls are weaker and concurrent/shared updates are harder to\nmanage."
    },
    {
      "id": "FEB25-Q1-C",
      "parentId": "FEB25-Q1",
      "session": "February 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain data, spreadsheet differences, referential-integrity rules and design strategies",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Describe and illustrate the Insert, Update, and Delete rules of referential integrity.",
      "answer": "Insert rule: a child FK must be null when optional or match an existing parent PK. Example:\nORDER.CustomerID 99 cannot be inserted if CUSTOMER 99 does not exist.\nUpdate rule: changing a parent PK or child FK must not leave unmatched child rows. The DBMS\nmay restrict the update or cascade it to related rows.\nDelete rule: a parent row with dependent child rows cannot be deleted unless the action is\nrestricted, cascaded, or the FK is set to null when permitted."
    },
    {
      "id": "FEB25-Q1-D",
      "parentId": "FEB25-Q1",
      "session": "February 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain data, spreadsheet differences, referential-integrity rules and design strategies",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE differences between centralized and decentralized design.",
      "answer": "Centralized: small/simple data component; decentralized: many entities and complex\nrelations/operations.\nCentralized: one DBA or small team; decentralized: several teams design separate modules.\nCentralized: one model is created and validated; decentralized: module models are aggregated\nand conflicts such as synonyms/homonyms must be resolved.\nTip: Referential integrity is about parent-child key matching. Entity integrity is about the primary\nkey being unique and non-null."
    },
    {
      "id": "FEB25-Q2-A",
      "parentId": "FEB25-Q2",
      "session": "February 2025",
      "chapters": [
        2,
        4,
        6,
        8
      ],
      "topic": "Explain hierarchical-model limits, business-rule sources, backup and mobile marketing",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO disadvantages of the hierarchical model.",
      "answer": "It naturally supports only 1:M parent-child structures; M:N and multiple-parent relationships are\ndifficult and may require duplicated data.\nIt is navigational and structurally dependent: users/programs must know the path through the\ntree, making ad hoc queries and structural changes difficult."
    },
    {
      "id": "FEB25-Q2-B",
      "parentId": "FEB25-Q2",
      "session": "February 2025",
      "chapters": [
        2,
        4,
        6,
        8
      ],
      "topic": "Explain hierarchical-model limits, business-rule sources, backup and mobile marketing",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Identify FOUR sources of business rules.",
      "answer": "Company managers or policy makers.\nDepartment managers.\nDirect interviews with end users.\nWritten documentation such as procedures, standards, and operations manuals."
    },
    {
      "id": "FEB25-Q2-C",
      "parentId": "FEB25-Q2",
      "session": "February 2025",
      "chapters": [
        2,
        4,
        6,
        8
      ],
      "topic": "Explain hierarchical-model limits, business-rule sources, backup and mobile marketing",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Describe THREE types of database backup.",
      "answer": "Full backup/database dump: a complete copy of all database objects; supports full restoration but\ntakes the most time and storage.\nDifferential backup: copies objects changed since the last full backup; restoration uses the last full\nbackup plus the latest differential backup.\nTransaction log backup: copies transaction-log operations not already included in a previous\nbackup; supports recovery to a recent point in time."
    },
    {
      "id": "FEB25-Q2-D",
      "parentId": "FEB25-Q2",
      "session": "February 2025",
      "chapters": [
        2,
        4,
        6,
        8
      ],
      "topic": "Explain hierarchical-model limits, business-rule sources, backup and mobile marketing",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE advantages of a mobile database in marketing.",
      "answer": "Real-time field access: sales staff can check customer history, inventory, and prices while meeting\na customer.\nImmediate data capture and faster response: leads, orders, and feedback are entered at the point\nof contact and become available to the organization quickly.\nLocation-aware and personalized marketing: mobile/location data support targeted promotions\nand on-the-spot business intelligence.\nTip: For backup questions, distinguish differential from transaction-log backup. Differential copies\nchanged database objects since the last full backup; transaction-log backup copies logged operations."
    },
    {
      "id": "FEB25-Q3-A",
      "parentId": "FEB25-Q3",
      "session": "February 2025",
      "chapters": [
        5
      ],
      "topic": "Normalize a restaurant order logbook to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "State THREE problems in the burger logbook.",
      "answer": "Update anomaly/data inconsistency caused by repeated customer, staff, and menu facts.\nInsertion anomaly: a menu item, customer, or staff member cannot be stored independently of an\norder.\nDeletion anomaly: deleting the last order may remove the only stored evidence of a customer,\nstaff assignment, or menu usage."
    },
    {
      "id": "FEB25-Q3-B",
      "parentId": "FEB25-Q3",
      "session": "February 2025",
      "chapters": [
        5
      ],
      "topic": "Normalize a restaurant order logbook to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Create primary key(s) and identify dependencies.",
      "answer": "Keys and dependencies\nOrderID, CustomerID, and StaffID are introduced as surrogate identifiers because the logbook provides only dates and names,\nwhich are not guaranteed to be unique.\nNotation: underlined attribute = primary key; italic attribute with * = foreign key.\n1NF schema: ORDER_RECORD_1NF (OrderID, MenuCode, OrderDate, CustomerID, CustomerName, StaffID, StaffName,\nTotalOrders, MenuName, Quantity, TotalPayment, PaymentType)\nPrimary key(s)\n• OrderID + MenuCode (composite primary key).\nFull dependency\n• (OrderID, MenuCode) -> Quantity\nPartial dependencies\n• OrderID -> OrderDate, CustomerID, StaffID, TotalOrders, TotalPayment, PaymentType\n• MenuCode -> MenuName\nTransitive dependencies\n• CustomerID -> CustomerName\n• StaffID -> StaffName"
    },
    {
      "id": "FEB25-Q3-C",
      "parentId": "FEB25-Q3",
      "session": "February 2025",
      "chapters": [
        5
      ],
      "topic": "Normalize a restaurant order logbook to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize the logbook from 1NF to 3NF.",
      "answer": "Normalization steps\n1NF (First Normal Form)\nEliminate repeating groups, make every attribute atomic, and identify the primary key.\nORDER_RECORD_1NF (OrderID, MenuCode, OrderDate, CustomerID, CustomerName, StaffID, StaffName, TotalOrders,\nMenuName, Quantity, TotalPayment, PaymentType) - Split the list of ordered items into one menu item per row.\n2NF (Second Normal Form)\nThe relation must be in 1NF. Remove partial dependencies so every non-key attribute depends on the whole composite key.\nORDERS_2NF (OrderID, OrderDate, CustomerID, CustomerName, StaffID, StaffName, TotalOrders, TotalPayment,\nPaymentType) - Removes facts dependent only on OrderID.\nMENU (MenuCode, MenuName) - Removes the MenuCode partial dependency.\nORDER_DETAIL (OrderID*, MenuCode*, Quantity) - Quantity depends on the whole key.\n3NF (Third Normal Form)\nThe relations must be in 2NF. Remove transitive dependencies so non-key attributes depend on nothing but the key.\nCUSTOMER (CustomerID, CustomerName) - Stores customer facts once.\nSTAFF (StaffID, StaffName) - Stores staff facts once.\nMENU (MenuCode, MenuName) - Remains in 3NF.\nORDERS (OrderID, OrderDate, CustomerID*, StaffID*, PaymentType, TotalPayment) - References CUSTOMER and STAFF;\nTotalOrders is derived from ORDER_DETAIL.\nORDER_DETAIL (OrderID*, MenuCode*, Quantity) - Final associative/detail relation.\nTip: When the source has no reliable transaction ID, state the assumption and introduce a surrogate\nkey. Do not use a customer name as a permanent identifier."
    },
    {
      "id": "FEB25-Q4-A",
      "parentId": "FEB25-Q4",
      "session": "February 2025",
      "chapters": [
        7
      ],
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Calculate the total number of trips for each date.",
      "answer": "Access SQL using explicit JOIN\nSELECT TripDate, Count(BookingID) AS [Total Trips]\nFROM BOOKING\nGROUP BY TripDate;\nAlternative Access SQL\nSELECT TripDate, Count(BookingID) AS [Total Trips]\nFROM BOOKING\nGROUP BY TripDate;"
    },
    {
      "id": "FEB25-Q4-B",
      "parentId": "FEB25-Q4",
      "session": "February 2025",
      "chapters": [
        7
      ],
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display the customer with the highest number of bookings.",
      "answer": "Access SQL - complete model answer\nSELECT TOP 1 C.CustomerID, C.FirstName, C.LastName, C.PhoneNumber,\n       Count(B.BookingID) AS [Total Bookings]\nFROM CUSTOMERS AS C INNER JOIN BOOKING AS B ON C.CustomerID = B.CustomerID\nGROUP BY C.CustomerID, C.FirstName, C.LastName, C.PhoneNumber\nORDER BY Count(B.BookingID) DESC;"
    },
    {
      "id": "FEB25-Q4-C",
      "parentId": "FEB25-Q4",
      "session": "February 2025",
      "chapters": [
        7
      ],
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Increase salary by 10% for guides working on a trip in February 2025.",
      "answer": "Access SQL using explicit JOIN\nUPDATE GUIDE\nSET BasicSalary = BasicSalary * 1.10\nWHERE GuideID IN (\nSELECT GuideID\nFROM BOOKING\nWHERE TripDate >= #2025-02-01#\nAND TripDate < #2025-03-01#\n);\nAlternative Access SQL\nUPDATE GUIDE\nSET BasicSalary = BasicSalary * 1.10\nWHERE GuideID IN\n(SELECT GuideID\nFROM BOOKING\nWHERE TripDate >= #2025-02-01# AND TripDate < #2025-03-01#);"
    },
    {
      "id": "FEB25-Q4-D",
      "parentId": "FEB25-Q4",
      "session": "February 2025",
      "chapters": [
        7
      ],
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display package names booked more than 70 times.",
      "answer": "Access SQL using explicit JOIN\nSELECT P.PackageName, Count(B.BookingID) AS [Total Bookings]\nFROM PACKAGE AS P\nINNER JOIN BOOKING AS B ON P.PackageID = B.PackageID\nGROUP BY P.PackageID, P.PackageName\nHAVING Count(B.BookingID) > 70;\nAlternative Access SQL\nSELECT P.PackageName,\nCount(B.BookingID) AS [Total Bookings]\nFROM PACKAGE P, BOOKING B\nWHERE P.PackageID = B.PackageID\nGROUP BY P.PackageID, P.PackageName\nHAVING Count(B.BookingID) > 70;"
    },
    {
      "id": "FEB25-Q4-E",
      "parentId": "FEB25-Q4",
      "session": "February 2025",
      "chapters": [
        7
      ],
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Count distinct customers who made a booking from February through March 2025.",
      "answer": "Access SQL using explicit JOIN\nSELECT Count(*) AS [Total Customers]\nFROM (\nSELECT DISTINCT CustomerID\nFROM BOOKING\nWHERE BookingDate >= #2025-02-01#\nAND BookingDate < #2025-04-01#\n) AS X;\nAlternative Access SQL\n-- Query 1: list each customer once.\nSELECT CustomerID\nFROM BOOKING\nWHERE BookingDate >= #2025-02-01# AND BookingDate < #2025-04-01#\nGROUP BY CustomerID;\n-- Save Query 1 as Q_FebMarBookingCustomers.\n-- Query 2: count the saved rows.\nSELECT Count(CustomerID) AS [Total Customers]\nFROM Q_FebMarBookingCustomers;\nAccess note: Use the complete Access SQL answer shown above; a saved-query sequence is acceptable when it returns the same result.\nTip: SQL answers are marked line by line. Even when you are unsure, write at least one correct line.\nStart with SELECT (or CREATE/UPDATE), then add FROM, WHERE or JOIN, GROUP BY, HAVING, and\nORDER BY as far as you can. Each correct line may earn a mark, so do not leave the SQL answer blank.\nTechnical reminder: Use BookingDate when the wording says 'made a booking'; use TripDate when it refers\nto the travel/trip date."
    },
    {
      "id": "FEB25-Q5-A",
      "parentId": "FEB25-Q5",
      "session": "February 2025",
      "chapters": [
        4
      ],
      "topic": "Construct an art-training ERD and propose reports",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct the Excellent Art Crow's Foot ERD.",
      "answer": "The ERD below uses direct Crow's Foot symbols at every relationship end: a circle means optional (minimum 0), a bar means\none, and the crow's foot means many. Read the two ends together to determine connectivity and cardinality.\nEntity and key checklist\nEntity / required key structure\nSTUDIO, SUPPLIER, ART_MATERIAL, PROGRAM, EMPLOYEE, and SKILL with all required\nattributes and PKs.\nSTUDIO_SUPPLIER and SUPPLIER_MATERIAL associative entities.\nPROGRAM supertype plus VISUAL_ART, GLASS_PAINTING, and HANDICRAFT subtypes; disjoint\nand total.\nEMPLOYEE_SKILL and EMPLOYEE_MARRIAGE associative entities.\nRelationship and cardinality checklist\nRequired relationship\nSTUDIO M:N SUPPLIER and SUPPLIER M:N ART_MATERIAL.\nSTUDIO 1:M PROGRAM and STUDIO 1:M EMPLOYEE.\nEMPLOYEE M:N SKILL; recursive 0..1 spouse relationship with DateOfMarriage."
    },
    {
      "id": "FEB25-Q5-B",
      "parentId": "FEB25-Q5",
      "session": "February 2025",
      "chapters": [
        4
      ],
      "topic": "Construct an art-training ERD and propose reports",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "List TWO reports that can be produced.",
      "answer": "Studio programme catalogue: studio, programme type, programme fee, and subtype-specific\ndetail.\nEmployee skills report by studio, including employee, job title, and acquired skills.\nAlternatives: supplier/material/price report or employee marriage report.\nTip: Subtype-specific attributes must not be placed in the supertype for every row. Put ClassType,\nProgramLevel, and CraftData in their respective subtype tables."
    },
    {
      "id": "JULY25-Q1-A",
      "parentId": "JULY25-Q1",
      "session": "July 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain applications, database location, relational keys and DBMS selection",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Identify FOUR examples of database applications.",
      "answer": "Travel reservation/holiday booking.\nSupermarket sales and inventory.\nLibrary lending.\nUniversity student registration/records."
    },
    {
      "id": "JULY25-Q1-B",
      "parentId": "JULY25-Q1",
      "session": "July 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain applications, database location, relational keys and DBMS selection",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain TWO differences between a centralized database and a distributed database.",
      "answer": "Location: a centralized database stores data at one site; a distributed database stores logically\nrelated data across several networked sites.\nOperation/control: centralized data are simpler to administer but create a single-site dependency;\ndistributed data can support local access and availability but require coordination,\nreplication/fragmentation, and consistency control."
    },
    {
      "id": "JULY25-Q1-C",
      "parentId": "JULY25-Q1",
      "session": "July 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain applications, database location, relational keys and DBMS selection",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Describe candidate, primary, and secondary keys and give examples from AGENT.",
      "answer": "Candidate key (2 marks): a minimal attribute or set that uniquely identifies a row. AgentID and PassportNumber are candidate keys when both are unique and non-null.\nPrimary key (2 marks): the selected main row identifier. Example: AgentID.\nSecondary key (2 marks): a non-unique field used for retrieval or indexing. Examples: FirstName or AreaCode. PassportNumber remains an alternate candidate key."
    },
    {
      "id": "JULY25-Q1-D",
      "parentId": "JULY25-Q1",
      "session": "July 2025",
      "chapters": [
        1,
        3,
        6
      ],
      "topic": "Explain applications, database location, relational keys and DBMS selection",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE common DBMS software-selection factors.",
      "answer": "Cost: purchase, licence, maintenance, installation, conversion, operation, and training costs.\nFeatures and tools: query/report tools, development facilities, security, concurrency control,\ntransaction processing, ease of use, and performance.\nPortability/hardware requirements: supported platforms and languages, processor/RAM/storage\nneeds, and fit with existing infrastructure.\nAlternative: suitability of the underlying data model.\nTip: A centralized database versus distributed database question is about where data are stored. A\ncentralized versus decentralized design question is about how the design work is organized."
    },
    {
      "id": "JULY25-Q2-A",
      "parentId": "JULY25-Q2",
      "session": "July 2025",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain network-model limits, table violations, designer views and Big Data benefits",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO disadvantages of the network model.",
      "answer": "Complex/cumbersome design and maintenance: set structures and pointers become difficult to\nunderstand as relationships and applications grow.\nNavigational access and limited ad hoc querying: programs must know the access paths, causing\nstructural dependence and difficult changes."
    },
    {
      "id": "JULY25-Q2-B",
      "parentId": "JULY25-Q2",
      "session": "July 2025",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain network-model limits, table violations, designer views and Big Data benefits",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain TWO reasons the BOOKS table violates relational-table characteristics.",
      "answer": "ISBN is intended to identify a book, but 978-9814824-24-7 occurs twice; the table therefore lacks a\nunique row identifier/entity integrity.\nAuthors contains several names in one cell (for example, Ahmad Rostam, Rozanizam, Alizi Alias),\nviolating the rule that each intersection contains one atomic value."
    },
    {
      "id": "JULY25-Q2-C",
      "parentId": "JULY25-Q2",
      "session": "July 2025",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain network-model limits, table violations, designer views and Big Data benefits",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE designer views of data.",
      "answer": "Conceptual view/model: the global organization-wide view of entities, relationships, and\nconstraints; independent of software and hardware.\nInternal/logical view/model: the database as seen by the selected DBMS; maps conceptual objects\nto tables, columns, keys, relationships, and constraints; DBMS-dependent but hardware-\nindependent.\nPhysical view/model: the lowest-level storage view describing files, indexes, storage media, and\naccess paths; dependent on both DBMS and hardware."
    },
    {
      "id": "JULY25-Q2-D",
      "parentId": "JULY25-Q2",
      "session": "July 2025",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain network-model limits, table violations, designer views and Big Data benefits",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Describe THREE benefits of Big Data to companies.",
      "answer": "Better and faster decisions: large, current data sets support trend discovery, forecasting, and\npredictive analysis.\nImproved customer understanding and personalization: web, social, mobile, and transaction data\nreveal behavior and support targeted services/marketing.\nOperational efficiency and innovation: sensor/transaction streams expose bottlenecks, support\nreal-time monitoring, and create new products or services.\nTip: For abstraction questions, move from broad to detailed: conceptual -> internal/logical ->\nphysical. Mention software/hardware dependence because it distinguishes the levels clearly."
    },
    {
      "id": "JULY25-Q3-A",
      "parentId": "JULY25-Q3",
      "session": "July 2025",
      "chapters": [
        5
      ],
      "topic": "Normalize an employee-skills record to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "State the normal form of the employee-skills table and explain.",
      "answer": "The table is UNF (not yet 1NF) because Department ID & Name and Skill ID & Skill Name combine\nmultiple facts in single cells.\nCompletionDate also mixes a date domain with the text “Not complete yet”; incomplete\ncertification should use NULL plus a separate status if required."
    },
    {
      "id": "JULY25-Q3-B",
      "parentId": "JULY25-Q3",
      "session": "July 2025",
      "chapters": [
        5
      ],
      "topic": "Normalize an employee-skills record to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Identify keys and dependencies.",
      "answer": "Keys and dependencies\nNotation: underlined attribute = primary key; italic attribute with * = foreign key.\n1NF schema: EMPLOYEE_SKILL_1NF (StaffID, SkillID, StaffName, Position, DepartmentID, DepartmentName, SkillName,\nCompletionDate)\nPrimary key(s)\n• StaffID + SkillID (composite primary key).\nFull dependency\n• (StaffID, SkillID) -> CompletionDate\nPartial dependencies\n• StaffID -> StaffName, Position, DepartmentID\n• SkillID -> SkillName\nTransitive dependencies\n• DepartmentID -> DepartmentName"
    },
    {
      "id": "JULY25-Q3-C",
      "parentId": "JULY25-Q3",
      "session": "July 2025",
      "chapters": [
        5
      ],
      "topic": "Normalize an employee-skills record to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize the table from 1NF to 3NF.",
      "answer": "Normalization steps\n1NF (First Normal Form)\nEliminate repeating groups, make every attribute atomic, and identify the primary key.\nEMPLOYEE_SKILL_1NF (StaffID, SkillID, StaffName, Position, DepartmentID, DepartmentName, SkillName, CompletionDate)\n- Split combined Department and Skill cells; store one skill per row.\n2NF (Second Normal Form)\nThe relation must be in 1NF. Remove partial dependencies so every non-key attribute depends on the whole composite key.\nSTAFF_2NF (StaffID, StaffName, Position, DepartmentID, DepartmentName) - Removes the StaffID partial dependency.\nSKILL (SkillID, SkillName) - Removes the SkillID partial dependency.\nCERTIFICATION (StaffID*, SkillID*, CompletionDate) - CompletionDate depends on the whole key.\n3NF (Third Normal Form)\nThe relations must be in 2NF. Remove transitive dependencies so non-key attributes depend on nothing but the key.\nDEPARTMENT (DepartmentID, DepartmentName) - Removes DepartmentID -> DepartmentName.\nSTAFF (StaffID, StaffName, Position, DepartmentID*) - References DEPARTMENT.\nSKILL (SkillID, SkillName) - Remains in 3NF.\nCERTIFICATION (StaffID*, SkillID*, CompletionDate) - Staff with no skill remains in STAFF without a fake certification row.\nTip: A staff member with no skill must still be insertable. That is why STAFF must be independent of\nCERTIFICATION; do not create a fake skill row or store “no skill” as a value."
    },
    {
      "id": "JULY25-Q4-A",
      "parentId": "JULY25-Q4",
      "session": "July 2025",
      "chapters": [
        7
      ],
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Display project names assigned from January through April 2025.",
      "answer": "Access SQL using explicit JOIN\nSELECT DISTINCT P.ProjName\nFROM PROJECT AS P\nINNER JOIN ASSIGN AS A ON P.ProjCode = A.ProjCode\nWHERE A.AssignDate >= #2025-01-01#\nAND A.AssignDate < #2025-05-01#;\nAlternative Access SQL\nSELECT DISTINCT P.ProjName\nFROM PROJECT P, ASSIGN A\nWHERE P.ProjCode = A.ProjCode\nAND A.AssignDate >= #2025-01-01# AND A.AssignDate < #2025-05-01#;"
    },
    {
      "id": "JULY25-Q4-B",
      "parentId": "JULY25-Q4",
      "session": "July 2025",
      "chapters": [
        7
      ],
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 5,
      "prompt": "Display total charge for each employee as “Total Charge”.",
      "answer": "Access SQL using explicit JOIN\nSELECT E.EmpID,\nE.EmpFirstName & ' ' & E.EmpLastName AS [Employee Name],\nSum(A.AssignHours * J.JobChargeHour) AS [Total Charge]\nFROM (EMPLOYEE AS E\nINNER JOIN JOB AS J ON E.JobCode = J.JobCode)\nINNER JOIN ASSIGN AS A ON E.EmpID = A.EmpID\nGROUP BY E.EmpID, E.EmpFirstName, E.EmpLastName;\nAlternative Access SQL\nSELECT E.EmpID,\nE.EmpFirstName & ' ' & E.EmpLastName AS [Employee Name],\nSum(A.AssignHours * J.JobChargeHour) AS [Total Charge]\nFROM EMPLOYEE E, JOB J, ASSIGN A\nWHERE E.JobCode = J.JobCode\nAND E.EmpID = A.EmpID\nGROUP BY E.EmpID, E.EmpFirstName, E.EmpLastName;"
    },
    {
      "id": "JULY25-Q4-C",
      "parentId": "JULY25-Q4",
      "session": "July 2025",
      "chapters": [
        7
      ],
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 5,
      "prompt": "Display full names of employees assigned to more than two distinct projects.",
      "answer": "Access SQL using explicit JOIN\nSELECT E.EmpID,\nE.EmpFirstName & ' ' & E.EmpLastName AS [Employee Name]\nFROM EMPLOYEE AS E\nINNER JOIN (\nSELECT EmpID, ProjCode\nFROM ASSIGN\nGROUP BY EmpID, ProjCode\n) AS AP ON E.EmpID = AP.EmpID\nGROUP BY E.EmpID, E.EmpFirstName, E.EmpLastName\nHAVING Count(AP.ProjCode) > 2;\nAlternative Access SQL\n-- Query 1: keep one row for each employee-project pair.\nSELECT EmpID, ProjCode\nFROM ASSIGN\nGROUP BY EmpID, ProjCode;\n-- Save Query 1 as Q_EmpProject.\n-- Query 2: count distinct projects for each employee.\nSELECT E.EmpID,\nE.EmpFirstName & ' ' & E.EmpLastName AS [Employee Name]\nFROM EMPLOYEE E, Q_EmpProject Q\nWHERE E.EmpID = Q.EmpID\nGROUP BY E.EmpID, E.EmpFirstName, E.EmpLastName\nHAVING Count(Q.ProjCode) > 2;\nAccess note: Use the complete Access SQL answer shown above; a saved-query sequence is acceptable when it returns the same result."
    },
    {
      "id": "JULY25-Q4-D",
      "parentId": "JULY25-Q4",
      "session": "July 2025",
      "chapters": [
        7
      ],
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Using a subquery, display job names with RM50 charge/hour and more than 10 employees.",
      "answer": "Access SQL using explicit JOIN\nSELECT JobName\nFROM JOB\nWHERE JobChargeHour = 50\nAND JobCode IN (\nSELECT JobCode\nFROM EMPLOYEE\nGROUP BY JobCode\nHAVING Count(EmpID) > 10\n);\nAlternative Access SQL\nSELECT JobName\nFROM JOB\nWHERE JobChargeHour = 50\nAND JobCode IN\n(SELECT JobCode\nFROM EMPLOYEE\nGROUP BY JobCode\nHAVING Count(EmpID) > 10);\nTip: SQL answers are marked line by line. Even when you are unsure, write at least one correct line.\nStart with SELECT (or CREATE/UPDATE), then add FROM, WHERE or JOIN, GROUP BY, HAVING, and\nORDER BY as far as you can. Each correct line may earn a mark, so do not leave the SQL answer blank.\nTechnical reminder: Microsoft Access does not support COUNT(DISTINCT field). Use a grouped/distinct\nsubquery or a saved query before counting."
    },
    {
      "id": "JULY25-Q5-A",
      "parentId": "JULY25-Q5",
      "session": "July 2025",
      "chapters": [
        4
      ],
      "topic": "Construct a solid-waste ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct the solid-waste recycling Crow's Foot ERD.",
      "answer": "The ERD below uses direct Crow's Foot symbols at every relationship end: a circle means optional (minimum 0), a bar means\none, and the crow's foot means many. Read the two ends together to determine connectivity and cardinality.\nEntity and key checklist\nEntity / required key structure\nCOLLECTOR, COLLECTION_DUTY, LOCALITY, HOUSE, VEHICLE, and SOLID_WASTE with stated\nattributes and suitable PKs.\nCOLLECTOR.SupervisorID is a self-referencing FK for the recursive supervisor relationship.\nDUTY_WASTE associative entity stores TotalWeight and resolves the duty-waste M:N relationship.\nRelationship and cardinality checklist\nRequired relationship\nSupervisor COLLECTOR 0..1 : 0..M subordinate COLLECTOR; the top-level supervisor has none and every other collector has one.\nCOLLECTOR, LOCALITY, and VEHICLE each have 1:M relationships with COLLECTION_DUTY.\nLOCALITY 1:M HOUSE.\nCOLLECTION_DUTY M:N SOLID_WASTE through DUTY_WASTE.\nSupervisorID is empty only for the designated top-level supervisor; supervision must be acyclic."
    },
    {
      "id": "JULY25-Q5-B",
      "parentId": "JULY25-Q5",
      "session": "July 2025",
      "chapters": [
        4
      ],
      "topic": "Construct a solid-waste ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify TWO relevant information outputs.",
      "answer": "Waste collection report by date/locality, showing waste type and total weight.\nCollector duty schedule showing collector, supervisor, locality, and vehicle.\nAlternative: houses by locality/category or vehicle utilization report.\nTip: TotalWeight describes a particular waste type collected during a particular duty, so it belongs in\nDUTY_WASTE—not in SOLID_WASTE or COLLECTION_DUTY alone."
    },
    {
      "id": "JULY26-Q1-A",
      "parentId": "JULY26-Q1",
      "session": "July 2026",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain database/DBMS, manual-file problems, business rules and DBLC initial study",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain the difference between a database and a DBMS.",
      "answer": "Database: an organized, shared collection of logically\nrelated data and its description, designed to meet the\ninformation needs of an organization.\nDBMS: the software that creates, stores, retrieves,\nupdates, secures, controls, and provides access to the\ndatabase; it acts as the interface between\nusers/applications and the data."
    },
    {
      "id": "JULY26-Q1-B",
      "parentId": "JULY26-Q1",
      "session": "July 2026",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain database/DBMS, manual-file problems, business rules and DBLC initial study",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO problems with Aisyah’s physical-folder record-keeping method as\nthe business expands.",
      "answer": "Slow and inefficient retrieval/reporting: staff must\nmanually search, sort, cross-reference, and total\ncustomer, order, and material records; the process\nbecomes time-consuming as the file volume grows.\nWeak control and reliability: records may be duplicated,\ninconsistent, misfiled, lost, damaged, or accessed by\nunauthorized people; backup, simultaneous sharing, and\nvalidation are difficult."
    },
    {
      "id": "JULY26-Q1-C",
      "parentId": "JULY26-Q1",
      "session": "July 2026",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain database/DBMS, manual-file problems, business rules and DBLC initial study",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE roles of business rules in database design.",
      "answer": "Standardize the organization’s view of data and provide a\ncommon communication tool between users and\ndatabase designers.\nHelp identify the required entities, attributes,\nrelationships, connectivity/cardinality, participation\nrules, and constraints.\nHelp the designer understand business processes and the\nnature, role, and scope of data so that an accurate data\nmodel can be produced."
    },
    {
      "id": "JULY26-Q1-D",
      "parentId": "JULY26-Q1",
      "session": "July 2026",
      "chapters": [
        1,
        4,
        6
      ],
      "topic": "Explain database/DBMS, manual-file problems, business rules and DBLC initial study",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Explain THREE activities in the first phase of the DBLC (database initial study).",
      "answer": "Analyze the company situation: study the mission,\norganizational structure, operational components, and\nhow the components interact.\nDefine problems and constraints: identify current\ninformation problems and limits such as policies,\nresources, budget, technology, and operating restrictions.\nDefine objectives: state what the proposed database must\nachieve and the information/services it must provide.\nAlternative: define the scope and boundaries\nby specifying the users, data, processes, organizational areas,\nand interfaces included or excluded.\nTip: The first DBLC phase has four standard activities. When only THREE are requested, explain any three clearly;\ndo not merely list the headings."
    },
    {
      "id": "JULY26-Q2-A",
      "parentId": "JULY26-Q2",
      "session": "July 2026",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain OODM limits, integrity constraints, design approaches and multimedia applications",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Describe TWO reasons why the Object-Oriented Data Model (OODM) is not widely\naccepted.",
      "answer": "Slow development of common OODM standards and low\nmarket penetration: fewer widely adopted products,\ntools, trained specialists, and compatible standards are\navailable than for relational systems.\nGreater complexity and cost: navigational object access, a\nsteep learning curve, and high system overhead can make\ndesign, programming, and transaction processing more\ndifficult or slower.\nOther possible answers: lack of standards, complex\nnavigational access, steep learning curve, high overhead that\nslows transactions, or lack of market penetration."
    },
    {
      "id": "JULY26-Q2-B",
      "parentId": "JULY26-Q2",
      "session": "July 2026",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain OODM limits, integrity constraints, design approaches and multimedia applications",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 4,
      "prompt": "Explain the integrity constraints violated in APPOINTMENT and identify the key(s)\nenforcing them.",
      "answer": "Entity integrity is violated because PatientID is part of the\ncomposite primary key (PatientID, DoctorID, Date) and a\nprimary-key component cannot be NULL. The composite\nprimary key enforces entity integrity.\nReferential integrity is violated because\nAPPOINTMENT.DeptID contains values that do not match\nan existing DEPARTMENT.DeptID. The foreign key\nAPPOINTMENT.DeptID -> DEPARTMENT.DeptID enforces\nthis rule. PatientID and DoctorID should likewise be FKs\nto PATIENT and DOCTOR."
    },
    {
      "id": "JULY26-Q2-C",
      "parentId": "JULY26-Q2",
      "session": "July 2026",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain OODM limits, integrity constraints, design approaches and multimedia applications",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Differentiate Top-Down and Bottom-Up design, and state which is better for a\ncomplex enterprise-wide database.",
      "answer": "Top-Down design starts with the organization-wide\nrequirements and a global conceptual model, then refines\nthe model into entities, relationships, attributes, and\nlower-level structures.\nBottom-Up design starts with existing data elements,\nforms, reports, files, or local tables, groups them into\nentities, and integrates the smaller structures into a\nlarger model.\nTop-Down is generally better for a complex enterprise-\nwide database because it preserves a global view,\ncommon standards, integration, and consistent business\nrules across departments. Bottom-Up may still be used to\nvalidate details."
    },
    {
      "id": "JULY26-Q2-D",
      "parentId": "JULY26-Q2",
      "session": "July 2026",
      "chapters": [
        2,
        3,
        6,
        8
      ],
      "topic": "Explain OODM limits, integrity constraints, design approaches and multimedia applications",
      "type": "theory_and_applied_interpretation",
      "difficulty": "intermediate",
      "marks": 6,
      "prompt": "Identify and explain THREE multimedia-database applications used by museums or\ncultural-heritage sites.",
      "answer": "Digital collection and image archive: stores high-\nresolution photographs/scans of artifacts, paintings,\nmanuscripts, and their descriptive metadata for\npreservation and retrieval.\nAudio and video archive: stores oral histories, interviews,\nperformances, documentaries, and audio guides linked to\nthe relevant people, objects, places, or exhibitions.\n3D/virtual exhibition application: stores 3D scans/models,\npanoramic media, and interactive virtual tours or\nreconstructions for remote access, education, and\npreservation.\nTip: For model-comparison questions, state the defining approach first, then explain its consequence. For integrity,\ndistinguish entity integrity (PK unique and non-null) from referential integrity (FK must match a parent PK)."
    },
    {
      "id": "JULY26-Q3-A",
      "parentId": "JULY26-Q3",
      "session": "July 2026",
      "chapters": [
        5
      ],
      "topic": "Normalize a student-performance record to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 3,
      "prompt": "State whether Sarah’s performance record is normalized and explain the problems.",
      "answer": "No. The record is in Unnormalized Form (UNF/0NF), not a\nproperly normalized relational table.\nAssessment Details and Course Details contain composite\nvalues (code plus description/name) instead of separate\natomic attributes, and no primary key is officially\nidentified.\nCourse, lecturer, and office data are repeated, producing\nredundancy and possible insertion, update, and deletion\nanomalies."
    },
    {
      "id": "JULY26-Q3-B",
      "parentId": "JULY26-Q3",
      "session": "July 2026",
      "chapters": [
        5
      ],
      "topic": "Normalize a student-performance record to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Identify the primary key(s), partial dependencies, and transitive dependencies.",
      "answer": "Keys and dependencies\n1NF relation: STUDENT_PERFORMANCE_1NF (CourseCode, AssessmentCode, CourseName, AssessmentType, DueDate, Marks, LecturerName, OfficeLocation)\nComposite primary key: (CourseCode, AssessmentCode).\nFull dependency: (CourseCode, AssessmentCode) -> DueDate, Marks.\nPartial dependencies: CourseCode -> CourseName, LecturerName, OfficeLocation; AssessmentCode -> AssessmentType.\nTransitive dependency: LecturerName -> OfficeLocation. Consequently, CourseCode -> LecturerName -> OfficeLocation."
    },
    {
      "id": "JULY26-Q3-C",
      "parentId": "JULY26-Q3",
      "session": "July 2026",
      "chapters": [
        5
      ],
      "topic": "Normalize a student-performance record to 3NF",
      "type": "normalization_problem",
      "difficulty": "advanced",
      "marks": 11,
      "prompt": "Normalize the relational schema to 3NF and show all work.",
      "answer": "1NF — separate the combined Course Details and Assessment Details into atomic attributes. Store one course–assessment result per row.\nSTUDENT_PERFORMANCE_1NF (CourseCode, AssessmentCode, CourseName, AssessmentType, DueDate, Marks, LecturerName, OfficeLocation)\nPK: (CourseCode, AssessmentCode).\n\n2NF — remove attributes that depend on only one part of the composite key.\nCOURSE_2NF (CourseCode, CourseName, LecturerName, OfficeLocation)\nASSESSMENT_TYPE (AssessmentCode, AssessmentType)\nPERFORMANCE (CourseCode*, AssessmentCode*, DueDate, Marks)\n\n3NF — remove the transitive dependency LecturerName -> OfficeLocation.\nLECTURER (LecturerID, LecturerName, OfficeLocation)\nCOURSE (CourseCode, CourseName, LecturerID*)\nASSESSMENT_TYPE (AssessmentCode, AssessmentType)\nPERFORMANCE (CourseCode*, AssessmentCode*, DueDate, Marks)\n\nUnderline each primary key in a drawn schema; * identifies a foreign key here. LecturerID is introduced as a surrogate key because no lecturer identifier is given. LecturerName could instead be a primary key only if its uniqueness is guaranteed."
    },
    {
      "id": "JULY26-Q4-A",
      "parentId": "JULY26-Q4",
      "session": "July 2026",
      "chapters": [
        7
      ],
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Create ENROLLMENT with a composite primary key and the required foreign keys.",
      "answer": "Access SQL using named constraints\nCREATE TABLE ENROLLMENT (\nMember_ID INTEGER NOT NULL,\nClass_ID INTEGER NOT NULL,\nEnrollDate DATE,\nCONSTRAINT ENROLLMENT_PK\nPRIMARY KEY (Member_ID, Class_ID),\nCONSTRAINT ENROLLMENT_MEMBER_FK\nFOREIGN KEY (Member_ID) REFERENCES [MEMBER] (Member_ID),\nCONSTRAINT ENROLLMENT_CLASS_FK\nFOREIGN KEY (Class_ID) REFERENCES [CLASS] (Class_ID)\n);\nAlternative Access SQL\nCREATE TABLE ENROLLMENT (\nMember_ID INTEGER NOT NULL,\nClass_ID INTEGER NOT NULL,\nEnrollDate DATE,\nPRIMARY KEY (Member_ID, Class_ID),\nFOREIGN KEY (Member_ID) REFERENCES [MEMBER],\nFOREIGN KEY (Class_ID) REFERENCES [CLASS]\n);\nSquare brackets are used because MEMBER and CLASS can conflict with reserved words in Microsoft Access."
    },
    {
      "id": "JULY26-Q4-B",
      "parentId": "JULY26-Q4",
      "session": "July 2026",
      "chapters": [
        7
      ],
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 5,
      "prompt": "Display trainers earning more than RM4,500, specializing in Yoga or Pilates, with\nnames beginning A; sort alphabetically.",
      "answer": "Access SQL using explicit JOIN\nSELECT Name\nFROM TRAINER\nWHERE Salary > 4500\nAND Specialization IN ('Yoga', 'Pilates')\nAND Name LIKE 'A*'\nORDER BY Name;\nMicrosoft Access uses * as the multi-character wildcard. In standard SQL, the equivalent pattern is A%.\nAlternative Access SQL\nSELECT Name\nFROM TRAINER\nWHERE Salary > 4500\nAND (Specialization = 'Yoga'\nOR Specialization = 'Pilates')\nAND Name LIKE 'A*'\nORDER BY Name;"
    },
    {
      "id": "JULY26-Q4-C",
      "parentId": "JULY26-Q4",
      "session": "July 2026",
      "chapters": [
        7
      ],
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 5,
      "prompt": "Display each class and its total members, only where more than 15 members\nenrolled after 1 January 2026.",
      "answer": "Access SQL using explicit JOIN\nSELECT C.ClassName,\nCount(E.Member_ID) AS [Total Members]\nFROM [CLASS] AS C\nINNER JOIN ENROLLMENT AS E\nON C.Class_ID = E.Class_ID\nWHERE E.EnrollDate > #2026-01-01#\nGROUP BY C.Class_ID, C.ClassName\nHAVING Count(E.Member_ID) > 15;\nAlternative Access SQL\nSELECT C.ClassName,\nCOUNT(E.Member_ID) AS [Total Members]\nFROM [CLASS] C, ENROLLMENT E\nWHERE C.Class_ID = E.Class_ID\nAND E.EnrollDate > #2026-01-01#\nGROUP BY C.Class_ID, C.ClassName\nHAVING COUNT(E.Member_ID) > 15;"
    },
    {
      "id": "JULY26-Q4-D",
      "parentId": "JULY26-Q4",
      "session": "July 2026",
      "chapters": [
        7
      ],
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "type": "sql_construction",
      "difficulty": "advanced",
      "marks": 6,
      "prompt": "Using a subquery, display trainers who teach Advanced-level members and earn\nmore than RM4,000.",
      "answer": "Access SQL using explicit JOIN\nSELECT Name\nFROM TRAINER\nWHERE Salary > 4000\nAND Trainer_ID IN (\nSELECT C.Trainer_ID\nFROM ([CLASS] AS C\nINNER JOIN ENROLLMENT AS E\nON C.Class_ID = E.Class_ID)\nINNER JOIN [MEMBER] AS M\nON E.Member_ID = M.Member_ID\nWHERE M.Level = 'Advanced'\n);\nAlternative Access SQL\nSELECT Name\nFROM TRAINER\nWHERE Salary > 4000\nAND Trainer_ID IN\n(SELECT C.Trainer_ID\nFROM [CLASS] C, ENROLLMENT E, [MEMBER] M\nWHERE C.Class_ID = E.Class_ID\nAND E.Member_ID = M.Member_ID\nAND M.Level = 'Advanced');\nBoth versions connect CLASS to ENROLLMENT and MEMBER in the subquery, then return trainers whose salary exceeds RM4,000."
    },
    {
      "id": "JULY26-Q5-A",
      "parentId": "JULY26-Q5",
      "session": "July 2026",
      "chapters": [
        4
      ],
      "topic": "Construct a student-merit ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 16,
      "prompt": "Construct the Student Merit Activities database using Crow's Foot notation.",
      "answer": "The ERD below shows direct Crow's Foot symbols for connectivity, minimum participation, and maximum\ncardinality. It also resolves both M:N relationships through associative entities.\nEntity and key checklist\nSTUDENT: StudentID (PK), Name, PhoneNumber,\nProgramCode.\nEVENT: EventID (PK), EventName, EventDate,\nMeritPoints, StaffID (FK), LeaderStudentID (FK).\nPARTICIPATION: ParticipationID (PK), StudentID (FK),\nEventID (FK).\nEQUIPMENT: EquipmentID (PK), EquipmentName,\nTotalQuantity.\nEVENT_EQUIPMENT: EventID and EquipmentID as\ncomposite PK/FKs, plus QuantityUsed.\nSTAFF: StaffID (PK), StaffName.\nRelationship and cardinality checklist\nSTUDENT 1 : 0..M PARTICIPATION; each PARTICIPATION\nbelongs to exactly one STUDENT.\nEVENT 1 : 1..M PARTICIPATION; each event must have at\nleast one participant and each participation belongs to\none event.\nSTUDENT 1 : 0..M EVENT as Event Leader; every EVENT is\nled by exactly one STUDENT.\nSTAFF 1 : 0..M EVENT; every EVENT is supervised by\nexactly one STAFF member, while a staff member may\nsupervise none.\nEVENT M:N EQUIPMENT is resolved by\nEVENT_EQUIPMENT; each detail row records\nQuantityUsed.\nTip: Do not place QuantityUsed in EVENT or EQUIPMENT. It describes one equipment item used for one particular\nevent, so it belongs in the associative entity EVENT_EQUIPMENT. The event leader is a role played by STUDENT, so\nEVENT.LeaderStudentID is a foreign key to STUDENT."
    },
    {
      "id": "JULY26-Q5-B",
      "parentId": "JULY26-Q5",
      "session": "July 2026",
      "chapters": [
        4
      ],
      "topic": "Construct a student-merit ERD and identify information outputs",
      "type": "erd_design",
      "difficulty": "advanced",
      "marks": 4,
      "prompt": "Identify TWO relevant information outputs obtainable from the ERD.",
      "answer": "Student hostel-merit report: each student’s event\nparticipation and total merit points, calculated by\nsumming EVENT.MeritPoints through PARTICIPATION.\nEvent equipment report: equipment required and\nQuantityUsed for each event, compared with\nEQUIPMENT.TotalQuantity to support availability\nplanning.\nOther acceptable output: event participant list, event leader\nlist, staff supervision schedule, or student participation\nhistory."
    }
  ],
  "sql": [
    {
      "id": "FEB23-Q4-A",
      "session": "February 2023",
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "marks": 4,
      "prompt": "Create table DELIVERY.",
      "modelSql": "CREATE TABLE DELIVERY (\nPackageID TEXT(20) CONSTRAINT PK_DELIVERY PRIMARY KEY,\nDateDeliver DATETIME NOT NULL,\nRiderID TEXT(20) NOT NULL,\nICNum TEXT(20) NOT NULL,\nStatus TEXT(15) NOT NULL,\nCONSTRAINT FK_DELIVERY_RIDER FOREIGN KEY (RiderID)\nREFERENCES RIDER (RiderID),\nCONSTRAINT FK_DELIVERY_CUSTOMER FOREIGN KEY (ICNum)\nREFERENCES CUSTOMER (ICNum)\n);",
      "modelNote": "The paper does not specify data types or field lengths; these are compatible examples and the foreign-key types must match their parent keys. The SQL creates the table but does not restrict Status to the two stated values. In Access table Design View, set the Status field Validation Rule to In ('delivered','unsuccessful'). This is a separate step, not part of the SQL to copy.",
      "features": {
        "operation": "CREATE TABLE",
        "tables": [
          "CUSTOMER",
          "DELIVERY",
          "RIDER"
        ],
        "clauses": [
          "PRIMARY KEY",
          "FOREIGN KEY"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "FEB23-Q4-B",
      "session": "February 2023",
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "marks": 4,
      "prompt": "Find the total number of distinct customers who successfully received packages in November 2022.",
      "modelSql": "SELECT Count(*) AS [Total Customers]\nFROM (\nSELECT DISTINCT ICNum\nFROM DELIVERY\nWHERE Status = 'delivered'\nAND DateDeliver >= #2022-11-01#\nAND DateDeliver < #2022-12-01#\n) AS X;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "DELIVERY"
        ],
        "clauses": [
          "WHERE",
          "DISTINCT"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 1,
        "dateBounds": [
          "2022-11-01",
          "2022-12-01"
        ]
      }
    },
    {
      "id": "FEB23-Q4-C",
      "session": "February 2023",
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "marks": 4,
      "prompt": "Find the total unsuccessful deliveries for each rider.",
      "modelSql": "SELECT R.RiderID, R.RiderName,\n       Sum(IIf(D.Status='unsuccessful',1,0)) AS [Total Unsuccessful]\nFROM RIDER AS R LEFT JOIN DELIVERY AS D ON R.RiderID = D.RiderID\nGROUP BY R.RiderID, R.RiderName;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "DELIVERY",
          "RIDER"
        ],
        "clauses": [
          "JOIN",
          "LEFT JOIN",
          "GROUP BY"
        ],
        "functions": [
          "SUM",
          "IIF"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "FEB23-Q4-D",
      "session": "February 2023",
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "marks": 4,
      "prompt": "List rider names that have made at least one delivery.",
      "modelSql": "SELECT DISTINCT R.RiderName\nFROM RIDER AS R\nINNER JOIN DELIVERY AS D ON R.RiderID = D.RiderID;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "DELIVERY",
          "RIDER"
        ],
        "clauses": [
          "JOIN",
          "DISTINCT"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "FEB23-Q4-E",
      "session": "February 2023",
      "topic": "Write DDL and aggregate/join SQL for package delivery",
      "marks": 4,
      "prompt": "Produce Package ID, Customer Name, and Status.",
      "modelSql": "SELECT D.PackageID AS [Package ID],\nC.CustName AS [Customer Name],\nD.Status\nFROM CUSTOMER AS C\nINNER JOIN DELIVERY AS D ON C.ICNum = D.ICNum;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "CUSTOMER",
          "DELIVERY"
        ],
        "clauses": [
          "JOIN"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY23-Q4-A",
      "session": "July 2023",
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "marks": 4,
      "prompt": "Create the APPLYLOAN table.",
      "modelSql": "CREATE TABLE APPLYLOAN (\nClientNum TEXT(20) NOT NULL,\nLoanID TEXT(20) NOT NULL,\nLoanTotal CURRENCY NOT NULL,\nLoanRemainder CURRENCY,\nLoanDate DATETIME NOT NULL,\nCONSTRAINT PK_APPLYLOAN PRIMARY KEY (ClientNum, LoanID),\nCONSTRAINT FK_APPLYLOAN_CLIENT FOREIGN KEY (ClientNum)\nREFERENCES CLIENT (ClientNum),\nCONSTRAINT FK_APPLYLOAN_LOAN FOREIGN KEY (LoanID)\nREFERENCES LOAN (LoanID)\n);",
      "modelNote": "The paper does not specify data types or field lengths. These are example choices; each foreign key must use a type compatible with its parent primary key.",
      "features": {
        "operation": "CREATE TABLE",
        "tables": [
          "APPLYLOAN",
          "CLIENT",
          "LOAN"
        ],
        "clauses": [
          "PRIMARY KEY",
          "FOREIGN KEY"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY23-Q4-B",
      "session": "July 2023",
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "marks": 4,
      "prompt": "Using a subquery, list client names that make a personal loan.",
      "modelSql": "SELECT ClientName\nFROM CLIENT\nWHERE ClientNum IN (\nSELECT ClientNum\nFROM APPLYLOAN\nWHERE LoanID IN (\nSELECT LoanID\nFROM LOAN\nWHERE LoanType = 'Personal Loan'\n)\n);",
      "features": {
        "operation": "SELECT",
        "tables": [
          "APPLYLOAN",
          "CLIENT",
          "LOAN"
        ],
        "clauses": [
          "WHERE"
        ],
        "functions": [],
        "minimumSubqueries": 2,
        "dateBounds": []
      }
    },
    {
      "id": "JULY23-Q4-C",
      "session": "July 2023",
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "marks": 4,
      "prompt": "Generate the total loan from 2021 until 2023.",
      "modelSql": "SELECT Sum(LoanTotal) AS [Total Loan]\nFROM APPLYLOAN\nWHERE LoanDate >= #2021-01-01#\nAND LoanDate < #2024-01-01#;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "APPLYLOAN"
        ],
        "clauses": [
          "WHERE"
        ],
        "functions": [
          "SUM"
        ],
        "minimumSubqueries": 0,
        "dateBounds": [
          "2021-01-01",
          "2024-01-01"
        ]
      }
    },
    {
      "id": "JULY23-Q4-D",
      "session": "July 2023",
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "marks": 4,
      "prompt": "List officers who manage housing loans and are from the Finance department.",
      "modelSql": "SELECT DISTINCT O.StaffName\nFROM (OFFICER AS O\nINNER JOIN DEPARTMENT AS D ON O.DeptID = D.DeptID)\nINNER JOIN LOAN AS L ON O.StaffID = L.StaffID\nWHERE L.LoanType = 'Housing Loan'\nAND D.DeptName = 'Finance';",
      "features": {
        "operation": "SELECT",
        "tables": [
          "DEPARTMENT",
          "LOAN",
          "OFFICER"
        ],
        "clauses": [
          "WHERE",
          "JOIN",
          "DISTINCT"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY23-Q4-E",
      "session": "July 2023",
      "topic": "Write DDL, subquery, date-range and grouping SQL for loans",
      "marks": 4,
      "prompt": "Generate the total loan for each loan type.",
      "modelSql": "SELECT L.LoanType, Sum(A.LoanTotal) AS [Total Loan]\nFROM LOAN AS L\nINNER JOIN APPLYLOAN AS A ON L.LoanID = A.LoanID\nGROUP BY L.LoanType;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "APPLYLOAN",
          "LOAN"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY"
        ],
        "functions": [
          "SUM"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JAN24-Q4-A",
      "session": "January 2024",
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "marks": 4,
      "prompt": "Display movies released from 2021 until 2023.",
      "modelSql": "SELECT *\nFROM MOVIE\nWHERE DateRelease >= #2021-01-01#\nAND DateRelease < #2024-01-01#;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "MOVIE"
        ],
        "clauses": [
          "WHERE"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": [
          "2021-01-01",
          "2024-01-01"
        ]
      }
    },
    {
      "id": "JAN24-Q4-B",
      "session": "January 2024",
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "marks": 4,
      "prompt": "Identify the total movies directed by Malaysian directors.",
      "modelSql": "SELECT Count(M.MovieID) AS [Total Movies]\nFROM DIRECTOR AS D\nINNER JOIN MOVIE AS M ON D.DirectorID = M.DirectorID\nWHERE D.Nationality = 'Malaysian';",
      "features": {
        "operation": "SELECT",
        "tables": [
          "DIRECTOR",
          "MOVIE"
        ],
        "clauses": [
          "WHERE",
          "JOIN"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JAN24-Q4-C",
      "session": "January 2024",
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "marks": 4,
      "prompt": "Calculate average net profit for each genre as “Average Net Profit”.",
      "modelSql": "SELECT Genre, Avg(NetProfit) AS [Average Net Profit]\nFROM MOVIE\nGROUP BY Genre;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "MOVIE"
        ],
        "clauses": [
          "GROUP BY"
        ],
        "functions": [
          "AVG"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JAN24-Q4-D",
      "session": "January 2024",
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "marks": 4,
      "prompt": "Identify reviewers who made more than two reviews.",
      "modelSql": "SELECT R.ReviewerName, Count(V.ReviewID) AS [Total Reviews]\nFROM REVIEWER AS R\nINNER JOIN REVIEW AS V ON R.ReviewerID = V.ReviewerID\nGROUP BY R.ReviewerID, R.ReviewerName\nHAVING Count(V.ReviewID) > 2;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "REVIEW",
          "REVIEWER"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JAN24-Q4-E",
      "session": "January 2024",
      "topic": "Write date, aggregate, grouping and maximum-result SQL for movies",
      "marks": 4,
      "prompt": "Display the movie that received the most reviews.",
      "modelSql": "SELECT TOP 1 M.MovieID, M.MovieName, Count(R.ReviewID) AS [Total Reviews]\nFROM MOVIE AS M INNER JOIN REVIEW AS R ON M.MovieID = R.MovieID\nGROUP BY M.MovieID, M.MovieName\nORDER BY Count(R.ReviewID) DESC;",
      "modelNote": "In Access, TOP 1 can return more than one movie if the highest review counts are tied. The question does not specify how to break a tie.",
      "features": {
        "operation": "SELECT",
        "tables": [
          "MOVIE",
          "REVIEW"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "ORDER BY"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY24-Q4-A",
      "session": "July 2024",
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "marks": 4,
      "prompt": "Calculate the total candidates for each faculty.",
      "modelSql": "SELECT F.FacultyID, F.FacultyName,\nCount(C.CandidateID) AS [Total Candidates]\nFROM (FACULTY AS F\nINNER JOIN STUDENT AS S ON F.FacultyID = S.FacultyID)\nINNER JOIN CANDIDATE AS C ON S.StudentID = C.StudentID\nGROUP BY F.FacultyID, F.FacultyName;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "CANDIDATE",
          "FACULTY",
          "STUDENT"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY24-Q4-B",
      "session": "July 2024",
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "marks": 4,
      "prompt": "Display students who did not vote for any candidate.",
      "modelSql": "SELECT S.*\nFROM STUDENT AS S\nLEFT JOIN VOTING AS V ON S.StudentID = V.StudID\nWHERE V.VotingID IS NULL;",
      "modelNote": "This answer treats a VOTING row as evidence that a student voted. If a VOTING row can exist without a VOTING_DETAILS row, check the details table to find students who selected no candidate.",
      "features": {
        "operation": "SELECT",
        "tables": [
          "STUDENT",
          "VOTING"
        ],
        "clauses": [
          "WHERE",
          "JOIN",
          "LEFT JOIN"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY24-Q4-C",
      "session": "July 2024",
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "marks": 4,
      "prompt": "Identify the total voters for each faculty.",
      "modelSql": "SELECT F.FacultyID, F.FacultyName,\nCount(V.VotingID) AS [Total Voters]\nFROM (FACULTY AS F\nINNER JOIN STUDENT AS S ON F.FacultyID = S.FacultyID)\nINNER JOIN VOTING AS V ON S.StudentID = V.StudID\nGROUP BY F.FacultyID, F.FacultyName;",
      "modelNote": "Counting VOTING rows equals counting distinct students only if each student has at most one VOTING row. The paper does not state that uniqueness rule; with repeat voting records, group by student before counting voters.",
      "features": {
        "operation": "SELECT",
        "tables": [
          "FACULTY",
          "STUDENT",
          "VOTING"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY24-Q4-D",
      "session": "July 2024",
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "marks": 4,
      "prompt": "Display full names of candidates receiving more than 500 votes.",
      "modelSql": "SELECT S.FirstName & ' ' & S.LastName AS [Candidate Name],\nCount(VD.VotingID) AS [Total Votes]\nFROM (CANDIDATE AS C\nINNER JOIN STUDENT AS S ON C.StudentID = S.StudentID)\nINNER JOIN VOTING_DETAILS AS VD ON C.CandidateID = VD.CandidateID\nGROUP BY C.CandidateID, S.FirstName, S.LastName\nHAVING Count(VD.VotingID) > 500;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "CANDIDATE",
          "STUDENT",
          "VOTING_DETAILS"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY24-Q4-E",
      "session": "July 2024",
      "topic": "Write grouped, anti-join and counting SQL for electronic voting",
      "marks": 4,
      "prompt": "Identify the total students who voted for only one candidate.",
      "modelSql": "SELECT Count(*) AS [Total Students]\nFROM (\nSELECT V.StudID\nFROM VOTING AS V\nINNER JOIN VOTING_DETAILS AS VD ON V.VotingID = VD.VotingID\nGROUP BY V.StudID\nHAVING Count(VD.CandidateID) = 1\n) AS X;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "VOTING",
          "VOTING_DETAILS"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 1,
        "dateBounds": []
      }
    },
    {
      "id": "FEB25-Q4-A",
      "session": "February 2025",
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "marks": 4,
      "prompt": "Calculate the total number of trips for each date.",
      "modelSql": "SELECT TripDate, Count(BookingID) AS [Total Trips]\nFROM BOOKING\nGROUP BY TripDate;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "BOOKING"
        ],
        "clauses": [
          "GROUP BY"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "FEB25-Q4-B",
      "session": "February 2025",
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "marks": 4,
      "prompt": "Display the customer with the highest number of bookings.",
      "modelSql": "SELECT TOP 1 C.CustomerID, C.FirstName, C.LastName, C.PhoneNumber,\n       Count(B.BookingID) AS [Total Bookings]\nFROM CUSTOMERS AS C INNER JOIN BOOKING AS B ON C.CustomerID = B.CustomerID\nGROUP BY C.CustomerID, C.FirstName, C.LastName, C.PhoneNumber\nORDER BY Count(B.BookingID) DESC;",
      "modelNote": "In Access, TOP 1 can return multiple customers when their booking counts tie for first. The question does not specify a tie-break rule.",
      "features": {
        "operation": "SELECT",
        "tables": [
          "BOOKING",
          "CUSTOMERS"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "ORDER BY"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "FEB25-Q4-C",
      "session": "February 2025",
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "marks": 4,
      "prompt": "Increase salary by 10% for guides working on a trip in February 2025.",
      "modelSql": "UPDATE GUIDE\nSET BasicSalary = BasicSalary * 1.10\nWHERE GuideID IN (\nSELECT GuideID\nFROM BOOKING\nWHERE TripDate >= #2025-02-01#\nAND TripDate < #2025-03-01#\n);",
      "features": {
        "operation": "UPDATE",
        "tables": [
          "BOOKING",
          "GUIDE"
        ],
        "clauses": [
          "WHERE"
        ],
        "functions": [],
        "minimumSubqueries": 1,
        "dateBounds": [
          "2025-02-01",
          "2025-03-01"
        ]
      }
    },
    {
      "id": "FEB25-Q4-D",
      "session": "February 2025",
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "marks": 4,
      "prompt": "Display package names booked more than 70 times.",
      "modelSql": "SELECT P.PackageName, Count(B.BookingID) AS [Total Bookings]\nFROM PACKAGE AS P\nINNER JOIN BOOKING AS B ON P.PackageID = B.PackageID\nGROUP BY P.PackageID, P.PackageName\nHAVING Count(B.BookingID) > 70;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "BOOKING",
          "PACKAGE"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "FEB25-Q4-E",
      "session": "February 2025",
      "topic": "Write aggregate, maximum, UPDATE and date-range SQL for travel bookings",
      "marks": 4,
      "prompt": "Count distinct customers who made a booking from February through March 2025.",
      "modelSql": "SELECT Count(*) AS [Total Customers]\nFROM (\nSELECT DISTINCT CustomerID\nFROM BOOKING\nWHERE BookingDate >= #2025-02-01#\nAND BookingDate < #2025-04-01#\n) AS X;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "BOOKING"
        ],
        "clauses": [
          "WHERE",
          "DISTINCT"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 1,
        "dateBounds": [
          "2025-02-01",
          "2025-04-01"
        ]
      }
    },
    {
      "id": "JULY25-Q4-A",
      "session": "July 2025",
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "marks": 4,
      "prompt": "Display project names assigned from January through April 2025.",
      "modelSql": "SELECT DISTINCT P.ProjName\nFROM PROJECT AS P\nINNER JOIN ASSIGN AS A ON P.ProjCode = A.ProjCode\nWHERE A.AssignDate >= #2025-01-01#\nAND A.AssignDate < #2025-05-01#;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "ASSIGN",
          "PROJECT"
        ],
        "clauses": [
          "WHERE",
          "JOIN",
          "DISTINCT"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": [
          "2025-01-01",
          "2025-05-01"
        ]
      }
    },
    {
      "id": "JULY25-Q4-B",
      "session": "July 2025",
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "marks": 5,
      "prompt": "Display total charge for each employee as “Total Charge”.",
      "modelSql": "SELECT E.EmpID,\nE.EmpFirstName & ' ' & E.EmpLastName AS [Employee Name],\nSum(A.AssignHours * J.JobChargeHour) AS [Total Charge]\nFROM (EMPLOYEE AS E\nINNER JOIN JOB AS J ON E.JobCode = J.JobCode)\nINNER JOIN ASSIGN AS A ON E.EmpID = A.EmpID\nGROUP BY E.EmpID, E.EmpFirstName, E.EmpLastName;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "ASSIGN",
          "EMPLOYEE",
          "JOB"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY"
        ],
        "functions": [
          "SUM"
        ],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY25-Q4-C",
      "session": "July 2025",
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "marks": 5,
      "prompt": "Display full names of employees assigned to more than two distinct projects.",
      "modelSql": "SELECT E.EmpID,\nE.EmpFirstName & ' ' & E.EmpLastName AS [Employee Name]\nFROM EMPLOYEE AS E\nINNER JOIN (\nSELECT EmpID, ProjCode\nFROM ASSIGN\nGROUP BY EmpID, ProjCode\n) AS AP ON E.EmpID = AP.EmpID\nGROUP BY E.EmpID, E.EmpFirstName, E.EmpLastName\nHAVING Count(AP.ProjCode) > 2;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "ASSIGN",
          "EMPLOYEE"
        ],
        "clauses": [
          "JOIN",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 1,
        "dateBounds": []
      }
    },
    {
      "id": "JULY25-Q4-D",
      "session": "July 2025",
      "topic": "Write date, calculation, grouping and subquery SQL for project assignments",
      "marks": 6,
      "prompt": "Using a subquery, display job names with RM50 charge/hour and more than 10 employees.",
      "modelSql": "SELECT JobName\nFROM JOB\nWHERE JobChargeHour = 50\nAND JobCode IN (\nSELECT JobCode\nFROM EMPLOYEE\nGROUP BY JobCode\nHAVING Count(EmpID) > 10\n);",
      "features": {
        "operation": "SELECT",
        "tables": [
          "EMPLOYEE",
          "JOB"
        ],
        "clauses": [
          "WHERE",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 1,
        "dateBounds": []
      }
    },
    {
      "id": "JULY26-Q4-A",
      "session": "July 2026",
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "marks": 4,
      "prompt": "Create ENROLLMENT with a composite primary key and the required foreign keys.",
      "modelSql": "CREATE TABLE ENROLLMENT (\nMember_ID INTEGER NOT NULL,\nClass_ID INTEGER NOT NULL,\nEnrollDate DATE,\nCONSTRAINT ENROLLMENT_PK\nPRIMARY KEY (Member_ID, Class_ID),\nCONSTRAINT ENROLLMENT_MEMBER_FK\nFOREIGN KEY (Member_ID) REFERENCES [MEMBER] (Member_ID),\nCONSTRAINT ENROLLMENT_CLASS_FK\nFOREIGN KEY (Class_ID) REFERENCES [CLASS] (Class_ID)\n);",
      "modelNote": "The paper does not specify data types. INTEGER and DATE are example Access types; Member_ID and Class_ID must match the corresponding parent-key types.",
      "features": {
        "operation": "CREATE TABLE",
        "tables": [
          "CLASS",
          "ENROLLMENT",
          "MEMBER"
        ],
        "clauses": [
          "PRIMARY KEY",
          "FOREIGN KEY"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY26-Q4-B",
      "session": "July 2026",
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "marks": 5,
      "prompt": "Display trainers earning more than RM4,500, specializing in Yoga or Pilates, with\nnames beginning A; sort alphabetically.",
      "modelSql": "SELECT Name\nFROM TRAINER\nWHERE Salary > 4500\nAND Specialization IN ('Yoga', 'Pilates')\nAND Name LIKE 'A*'\nORDER BY Name;",
      "modelNote": "For the usual ANSI-89 setting in an Access .accdb, * matches any sequence of characters in a LIKE pattern. An ANSI-92 database uses % instead.",
      "features": {
        "operation": "SELECT",
        "tables": [
          "TRAINER"
        ],
        "clauses": [
          "WHERE",
          "ORDER BY"
        ],
        "functions": [],
        "minimumSubqueries": 0,
        "dateBounds": []
      }
    },
    {
      "id": "JULY26-Q4-C",
      "session": "July 2026",
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "marks": 5,
      "prompt": "Display each class and its total members, only where more than 15 members\nenrolled after 1 January 2026.",
      "modelSql": "SELECT C.ClassName,\nCount(E.Member_ID) AS [Total Members]\nFROM [CLASS] AS C\nINNER JOIN ENROLLMENT AS E\nON C.Class_ID = E.Class_ID\nWHERE E.EnrollDate > #2026-01-01#\nGROUP BY C.Class_ID, C.ClassName\nHAVING Count(E.Member_ID) > 15;",
      "features": {
        "operation": "SELECT",
        "tables": [
          "CLASS",
          "ENROLLMENT"
        ],
        "clauses": [
          "WHERE",
          "JOIN",
          "GROUP BY",
          "HAVING"
        ],
        "functions": [
          "COUNT"
        ],
        "minimumSubqueries": 0,
        "dateBounds": [
          "2026-01-01"
        ]
      }
    },
    {
      "id": "JULY26-Q4-D",
      "session": "July 2026",
      "topic": "Write composite-key DDL, filtering, grouping and subquery SQL for a fitness centre",
      "marks": 6,
      "prompt": "Using a subquery, display trainers who teach Advanced-level members and earn\nmore than RM4,000.",
      "modelSql": "SELECT Name\nFROM TRAINER\nWHERE Salary > 4000\nAND Trainer_ID IN (\nSELECT C.Trainer_ID\nFROM ([CLASS] AS C\nINNER JOIN ENROLLMENT AS E\nON C.Class_ID = E.Class_ID)\nINNER JOIN [MEMBER] AS M\nON E.Member_ID = M.Member_ID\nWHERE M.Level = 'Advanced'\n);",
      "features": {
        "operation": "SELECT",
        "tables": [
          "CLASS",
          "ENROLLMENT",
          "MEMBER",
          "TRAINER"
        ],
        "clauses": [
          "WHERE",
          "JOIN"
        ],
        "functions": [],
        "minimumSubqueries": 1,
        "dateBounds": []
      }
    }
  ]
};
