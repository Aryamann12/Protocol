# MongoDB Collection Schemas

Generated on: 2025-11-16T16:31:24.582Z

Total Collections: 17

## Fitness Domain

### gym-progress

- **Count**: 3 documents
- **Domain**: Fitness

#### Fields:

- **createdAt**: `Date`
- **date**: `string`
  - Example: "April 12th"
- **legs**: `Array` (Array)
  - Nested fields: exercise, progress, sets
- **location**: `null | string`
- **pull**: `Array` (Array)
  - Nested fields: exercise, progress, sets
- **push**: `Array` (Array)
  - Nested fields: exercise, progress, sets
- **updatedAt**: `Date`

## General Domain

### 10xiitian_Resources

- **Count**: 2 documents
- **Domain**: General

#### Fields:

- **createdAt**: `Date`
- **modules**: `Array` (Array)
  - Nested fields: sr_no, module, total_hours, completed_percentage, status, notes
- **track_name**: `string`
  - Example: "Tech_Foundations"
- **updatedAt**: `Date`

### socialplatforms

- **Count**: 3 documents
- **Domain**: General

#### Fields:

- **createdAt**: `Date`
- **name**: `string`
  - Example: "X"
- **purpose**: `string`
  - Example: "Explore and follow cool people"
- **sr_no**: `number`
  - Example: 1
- **type**: `string`
  - Example: "social"
- **updatedAt**: `Date`

### companies

- **Count**: 3 documents
- **Domain**: General

#### Fields:

- **AnnualRevenue**: `string`
  - Example: "$416.16 billion (fiscal year 2025, up 6% year-over-year)"
- **CEOAchievements**: `Array` (Array)
  - Example: "Grew Apple's market cap from $348 billion (2011) to $4+ trillion (2025)"
- **CEOAwards**: `string`
  - Example: "Time 100 Most Influential People; Advocate for LGBTQ+ rights; Industry leadership recognition"
- **CEOBirthdate**: `string`
  - Example: "November 1, 1960"
- **CEOBirthplace**: `string`
  - Example: "Mobile, Alabama, United States (grew up in Robertsdale, Alabama)"
- **CEOControversies**: `string`
  - Example: "Generally controversy-free; occasional criticism over Apple's supply chain practices, tax strategies..."
- **CEOEducation**: `Array` (Array)
  - Example: "B.S. in Industrial Engineering, Auburn University (1982) - graduated second in his class"
- **CEOEmployeeApprovalRating**: `Array | string` (Array)
  - Example: "97% (2012) - tied with Steve Jobs"
- **CEOImpactOnCompanyStrategy**: `string`
  - Example: "Shifted from product-first to services growth; emphasized operational efficiency and supply chain ex..."
- **CEOInterestsAndHobbies**: `string`
  - Example: "Fitness and cycling; privacy advocacy; technology innovation; mentorship; workplace diversity initia..."
- **CEOName**: `string`
  - Example: "Timothy Donald (Tim) Cook"
- **CEONetWorth**: `string`
  - Example: "$2.6 billion (2025)"
- **CEOPersonalBrandKeywords**: `string`
  - Example: "Operational Excellence, Privacy Advocate, Empathetic Leader, LGBTQ+ Champion, Calm & Analytical, Sus..."
- **CEOPhilanthropyFocus**: `Array | string` (Array)
  - Example: "Pledged to donate majority of wealth to philanthropy (after funding nephew's education)"
- **CEOPublicReputation**: `string`
  - Example: "Highly respected for operational excellence, diversity advocacy, privacy leadership; praised for sus..."
- **CEOQuotes**: `Array` (Array)
  - Example: "\"Your idea plus my idea is better than the individual ideas on their own\""
- **CompanyCultureTraits**: `Array` (Array)
  - Example: "Top-notch excellence and high hiring standards"
- **CompanyGrowthUnderCurrentCEO**: `Array` (Array)
  - Example: "Market cap: $348B (2011) → $4.03T (2025) = 1,058% increase"
- **CompanyHistorySummary**: `string`
  - Example: "Founded in 1976, Apple revolutionized personal computing with the Macintosh in 1984. After Steve Job..."
- **CompanyName**: `string`
  - Example: "Apple Inc."
- **Competitors**: `string | Array | Array`
  - Example: "Samsung (22.7% global smartphone share), Google (Pixel, Android, cloud services), Microsoft (PCs, cl..."
- **FoundedYear**: `number`
  - Example: 1976
- **Founders**: `Array` (Array)
  - Example: "Steve Jobs"
- **GlobalPresence**: `string`
  - Example: "Operations in 175+ countries and regions; over 500 retail stores in 23 countries; strong presence in..."
- **HeadquartersLocation**: `string`
  - Example: "Cupertino, California, United States"
- **IndustryOrSector**: `string`
  - Example: "Technology Hardware, Storage & Peripherals / Consumer Electronics"
- **KeyPersonalityTraits**: `Array` (Array)
  - Example: "Empathetic and emotionally intelligent"
- **LeadershipStyle**: `string`
  - Example: "Democratic, collaborative, calm and analytical; process-driven with emphasis on transparency and act..."
- **MarketCap**: `string`
  - Example: "$4.03 trillion (November 2025) - world's 2nd most valuable company"
- **NotableProductsOrServices**: `Array` (Array)
  - Example: "Mac computers and MacBook laptops"
- **PreviousRoles**: `Array` (Array)
  - Example: "IBM (1982-1994): 12 years culminating as Director of North American Fulfillment"
- **RecentMajorNews**: `Array` (Array)
  - Example: "Q4 2025 revenue record of $102.5 billion (October 2025)"
- **StrategicFocusAreas**: `Array` (Array)
  - Example: "AI Integration: Deploying Apple Intelligence across entire product line with privacy-first approach"
- **VisionOrMissionStatement**: `string`
  - Example: "Mission: "To bring the best user experience to customers through innovative hardware, software, and ..."
- **YearBecameCEO**: `string`
  - Example: "August 24, 2011"
- **createdAt**: `Date`
- **updatedAt**: `Date`

### udemycourses

- **Count**: 2 documents
- **Domain**: General

#### Fields:

- **access_type**: `string`
  - Example: "Unlimited Access"
- **coverage**: `string`
  - Example: "All Courses"
- **createdAt**: `Date`
- **platform**: `string`
  - Example: "Udemy"
- **status**: `string`
  - Example: "present"
- **updatedAt**: `Date`

## Inventory Domain

### utensils

- **Count**: 3 documents
- **Domain**: Inventory

#### Fields:

- **category**: `string`
  - Example: "Cookware"
- **createdAt**: `Date`
- **item_name**: `string`
  - Example: "Non-stick Pan"
- **location**: `string`
  - Example: "Utensil Rack"
- **notes**: `string`
  - Example: "For omelettes and light frying."
- **quantity**: `number`
  - Example: 2
- **sr_no**: `number`
  - Example: 1
- **updatedAt**: `Date`

### fridgeitems

- **Count**: 3 documents
- **Domain**: Inventory

#### Fields:

- **category**: `string`
  - Example: "Dairy"
- **createdAt**: `Date`
- **expiry_date**: `string`
  - Example: "2025-11-20"
- **item_name**: `string`
  - Example: "Milk"
- **notes**: `string`
  - Example: "Use for tea/coffee and breakfast."
- **priority_to_consume**: `string`
  - Example: "High"
- **quantity**: `string`
  - Example: "1 L"
- **sr_no**: `number`
  - Example: 1
- **status**: `string`
  - Example: "Fresh"
- **storage_shelf**: `string`
  - Example: "Top Shelf"
- **updatedAt**: `Date`

### musicalinstruments

- **Count**: 2 documents
- **Domain**: Inventory

#### Fields:

- **category**: `string`
  - Example: "Guitar"
- **createdAt**: `Date`
- **details**: `object` (Object)
  - Nested fields: accessories
- **sr_no**: `number`
  - Example: 1
- **updatedAt**: `Date`

### devices

- **Count**: 3 documents
- **Domain**: Inventory

#### Fields:

- **bought_year**: `number`
  - Example: 2023
- **category**: `string`
  - Example: "PersonalLaptop"
- **chipset**: `string`
  - Example: "A14 Bionic"
- **compatible_with**: `Array` (Array)
- **createdAt**: `Date`
- **description**: `string`
  - Example: "Super Powerful Laptop"
- **device_name**: `string`
  - Example: "ROG M16 Gaming Laptop"
- **specs**: `object` (Object)
  - Nested fields: processor, ram, graphics, note
- **sr_no**: `number`
  - Example: 1
- **updatedAt**: `Date`

### kitchenequipments

- **Count**: 3 documents
- **Domain**: Inventory

#### Fields:

- **category**: `string`
  - Example: "Appliance"
- **createdAt**: `Date`
- **item_name**: `string`
  - Example: "Air Fryer"
- **location**: `string`
  - Example: "Kitchen Counter"
- **model_details**: `string`
  - Example: "1.2 L"
- **notes**: `string`
  - Example: "Use for quick air-fried snacks."
- **purchase_date**: `null`
- **sr_no**: `number`
  - Example: 1
- **updatedAt**: `Date`
- **usage_frequency**: `string`
  - Example: "Weekly"
- **warranty_expiry**: `null`

### mobilities

- **Count**: 3 documents
- **Domain**: Inventory

#### Fields:

- **category**: `string`
  - Example: "Scooty"
- **createdAt**: `Date`
- **description**: `string`
  - Example: "Ignites passion for roaming and wandering around the city; extremely useful for daily life."
- **details**: `object` (Object)
  - Nested fields: availability, notes
- **device_name**: `string`
  - Example: "Rented Scooty"
- **purpose**: `string`
  - Example: "Exploring Hyderabad freely"
- **sr_no**: `number`
  - Example: 1
- **updatedAt**: `Date`
- **usage**: `Array` (Array)
  - Example: "Visiting supermarkets"

## Learning Domain

### tlelevel3courses

- **Count**: 3 documents
- **Domain**: Learning

#### Fields:

- **createdAt**: `Date`
- **module**: `string`
  - Example: "Binary Search"
- **sr_no**: `number`
  - Example: 1
- **topics**: `Array` (Array)
  - Nested fields: title, status, notes
- **updatedAt**: `Date`

### codingninjascourses

- **Count**: 3 documents
- **Domain**: Learning

#### Fields:

- **course_type**: `string`
  - Example: "BasicCpp"
- **createdAt**: `Date`
- **sr_no**: `number`
  - Example: 1
- **title**: `string`
  - Example: "1_LL1_1"
- **topics**: `Array` (Array)
- **updatedAt**: `Date`

### books

- **Count**: 3 documents
- **Domain**: Learning

#### Fields:

- **authors**: `Array` (Array)
  - Example: "Lewis Tunstall"
- **book_title**: `string`
  - Example: "NLP with Transformers"
- **category**: `string`
  - Example: "AI Books"
- **chapters**: `Array` (Array)
  - Nested fields: title, status, notes
- **createdAt**: `Date`
- **sr_no**: `number`
  - Example: 1
- **subcategory**: `string`
  - Example: "O'REILLY [HardCopies]"
- **updatedAt**: `Date`

### cppproblemlists

- **Count**: 1 documents
- **Domain**: Learning

#### Fields:

- **createdAt**: `Date`
- **description**: `string`
  - Example: "Migrated from TLE_LvL3"
- **list_name**: `string`
  - Example: "TLE_LvL3"
- **modules**: `Array` (Array)
  - Nested fields: sr_no, module_name, category, topics
- **updatedAt**: `Date`

### cppproblems

- **Count**: 3 documents
- **Domain**: Learning

#### Fields:

- **category**: `string`
  - Example: "Array"
- **code**: `string`
  - Example: "class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_m..."
- **createdAt**: `Date`
- **difficulty**: `string`
  - Example: "Easy"
- **id**: `string`
  - Example: "cpp-001"
- **imageUrl**: `string`
  - Example: "https://example.com/two-sum.png"
- **notes**: `string`
  - Example: "Use hash map to store complement values. Time complexity: O(n), Space: O(n)"
- **title**: `string`
  - Example: "Two Sum"
- **updatedAt**: `Date`

## Tech Domain

### streamingapps

- **Count**: 3 documents
- **Domain**: Tech

#### Fields:

- **createdAt**: `Date`
- **name**: `string`
  - Example: "Netflix"
- **sr_no**: `number`
  - Example: 1
- **type**: `string`
  - Example: "Movies & Series"
- **updatedAt**: `Date`

