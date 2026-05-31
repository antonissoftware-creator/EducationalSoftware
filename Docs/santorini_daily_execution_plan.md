# Santorini Daily — Execution Plan

## 1. Project Overview

**Santorini Daily** is a responsive educational web application designed as a digital museum and smart tourist guide for Santorini. The application aims to help tourists and the general public understand Santorini beyond its visual tourist identity, focusing on its history, mythology, volcanic landscape, natural environment, traditional settlements, architecture, and local culture.

The application supports guest access for general exploration and learning. Users can browse educational modules, explore Santorini through an interactive map, complete quizzes, and view progress statistics. When a user wants to save favorite places, create bookmarks, or preserve long-term progress, the system prompts them to create a simple account.

The application follows the requirements of the Educational Software assignment by including structured learning content, self-assessment activities, database-backed progress tracking, adaptive learning recommendations, and optional AI-powered support using Gemini through a Google AI Studio API key.

---

## 2. Product Identity

### Project Name

**Santorini Daily**

### Suggested Subtitle

**Discover the Island Behind the View**

Alternative subtitles:

- A Digital Learning Guide to Santorini
- Explore Santorini’s History, Volcano, and Culture
- A Smart Educational Journey through Santorini

### Product Type

Responsive educational web application / digital museum guide.

### Main Theme

Educational software for a tourist region of interest: **Santorini**.

### Educational Focus

The application combines:

1. Cultural and historical tourism education
2. Environmental and geological tourism education

---

## 3. Target Audience

The primary audience is:

- Tourists
- General public

The secondary audience is:

- Students
- Culture and history enthusiasts
- Visitors preparing for a trip to Santorini

The tone of the application should be accessible, elegant, informative, and not overly academic. It should feel like a digital museum and guide, not like a traditional school platform.

---

## 4. Languages

The application should support:

- Greek
- English

Recommended implementation:

- Store bilingual content in the database.
- Use fields such as `title_el`, `title_en`, `content_el`, and `content_en`.
- Add a language switcher in the navigation bar.
- Use English as the default language, with Greek available from the switcher.

Example routes or query structure:

```text
/modules/history?lang=en
/modules/history?lang=el
```

---

## 5. Educational Goals

The user should be able to:

1. Understand Santorini’s historical and mythological background.
2. Recognize the importance of Akrotiri and Ancient Thera.
3. Understand how the volcano and caldera shaped the island.
4. Identify important natural landmarks and environmental issues.
5. Recognize traditional villages and architectural features.
6. Understand the cultural value of local traditions, gastronomy, and wine culture.
7. Self-assess their knowledge through quizzes and review challenges.
8. Receive personalized recommendations based on learning performance.

---

## 6. Main Learning Modules

The application should include three main educational modules and one final review challenge.

---

### Module 1 — Myths & History of Santorini

#### Educational Goal

Introduce the user to Santorini’s mythological identity, historical development, and ancient settlements.

#### Topics

- Santorini’s ancient names and identity
- Mythological references
- Akrotiri and the Bronze Age settlement
- Ancient Thera
- The volcanic eruption and its historical significance
- Santorini through different historical periods

#### Learning Material

- Introductory text
- Timeline
- Images of Akrotiri, Ancient Thera, artifacts, and ruins
- Optional short video section
- “Did you know?” cards

#### Activities

- Multiple-choice quiz
- Timeline ordering activity
- True/false questions
- Image recognition question

Example activity:

```text
Which archaeological site is strongly associated with Bronze Age Santorini?
A. Akrotiri
B. Delphi
C. Knossos
D. Mycenae
```

Correct answer: **Akrotiri**

---

### Module 2 — Volcano, Caldera & Natural Environment

#### Educational Goal

Help the user understand Santorini’s volcanic origin, caldera formation, unique landscape, and environmental importance.

#### Topics

- How the caldera was formed
- Santorini’s volcanic activity
- Nea Kameni and Palea Kameni
- Red Beach, Black Beach, and volcanic geology
- Earthquakes and natural forces
- Environmental protection and sustainable tourism

#### Learning Material

- Text explanations
- Simple diagrams
- Interactive map points
- Images of the caldera, volcanic beaches, and volcanic islands
- Optional video about the volcano

#### Activities

- Quiz about geology and volcanoes
- Matching activity: beach type to geological explanation
- Scenario question: responsible visitor behavior
- Difficulty-adjusted quiz questions

Example activity:

```text
What is the caldera of Santorini mainly connected to?
A. Volcanic activity
B. River erosion
C. Artificial construction
D. Desertification
```

Correct answer: **Volcanic activity**

---

### Module 3 — Traditional Villages, Architecture & Local Culture

#### Educational Goal

Teach the user about Santorini’s villages, architectural identity, local traditions, and cultural tourism value.

#### Topics

- Oia, Fira, Pyrgos, Megalochori, Emporio
- Cycladic architecture
- Cave houses and whitewashed buildings
- Churches and blue domes
- Local products and gastronomy
- Wine culture and Santorini vineyards
- Traditional paths and settlements

#### Learning Material

- Village cards
- Architecture image gallery
- Interactive map markers
- Cultural facts
- Optional gastronomy section

#### Activities

- Village identification quiz
- Architecture feature matching
- Multiple-choice quiz
- “Choose your route” mini activity

Example activity:

```text
Which architectural feature is strongly connected with Santorini’s traditional settlements?
A. Cave houses
B. Wooden skyscrapers
C. Gothic towers
D. Roman aqueducts
```

Correct answer: **Cave houses**

---

### Final Review — Santorini Knowledge Challenge

The final review is a mixed assessment that combines questions from all three learning modules.

#### Purpose

- Reinforce learning
- Measure overall understanding
- Evaluate knowledge across multiple thematic areas
- Support the assignment requirement for repeated evaluation using content from more than one module

#### Includes Questions From

- Myths & History
- Volcano & Natural Environment
- Villages & Culture

#### Suggested Result Categories

```text
0–49%: Needs revision
50–74%: Good progress
75–89%: Strong explorer
90–100%: Santorini expert
```

---

## 7. Main Application Pages

---

### 7.1 Home Page

#### Purpose

Present the application and guide the user to begin learning.

#### Main Sections

- Hero section with Santorini visual identity
- App title and subtitle
- Short description of the application
- “Start Exploring” button
- Three module preview cards
- “Continue where you left off” section, if progress exists
- Language switcher
- Login/register button

---

### 7.2 Modules Page

#### Purpose

Show all learning modules.

Each module card should include:

- Title
- Short description
- Estimated time
- Progress percentage
- Difficulty label
- Start / Continue button
- Recommended badge if suggested by the adaptive system

Suggested modules:

- Myths & History
- Volcano & Natural Environment
- Villages & Culture
- Final Knowledge Challenge

---

### 7.3 Module Detail Page

#### Purpose

Present the educational content of one module.

#### Layout

- Module title
- Learning objectives
- Section-based educational material
- Images or video embed
- Key facts sidebar
- “Mark section as read” action
- “Take quiz” button
- Related map points

Example routes:

```text
/modules/history
/modules/volcano
/modules/culture
```

---

### 7.4 Quiz Page

#### Purpose

Provide self-assessment for each module.

#### Features

- One question at a time or grouped questions
- Multiple-choice questions
- True/false questions
- Matching questions
- Image-based questions
- Final feedback
- Score calculation
- Stored quiz attempt
- Explanations after submission

Example route:

```text
/modules/history/quiz
```

---

### 7.5 Interactive Map Page

#### Purpose

Allow users to explore Santorini geographically.

#### Suggested Map Markers

- Akrotiri
- Ancient Thera
- Oia
- Fira
- Pyrgos
- Nea Kameni
- Palea Kameni
- Red Beach
- Black Beach
- Megalochori
- Emporio
- Santorini vineyards

#### Marker Popup Content

- Image
- Short description
- Category
- Related module
- “Learn more” button
- “Save favorite” button, login required

#### Recommended Map Technology

Use:

- Leaflet
- React Leaflet
- OpenStreetMap tiles

Reason:

Leaflet is open-source, lightweight, and appropriate for a university project. It avoids the billing and free-tier limitations that may exist with commercial map platforms.

---

### 7.6 Progress Dashboard

#### Purpose

Show learning statistics and personalized recommendations.

#### For Guest Users

The dashboard can show current progress based on a guest session stored in the database.

#### For Logged-in Users

The dashboard should show long-term saved progress.

#### Dashboard Data

- Completed modules
- Quiz scores per module
- Number of attempts
- Average score
- Weakest topic
- Recommended next action
- Score progression chart
- Total completion percentage

#### Suggested Charts

- Bar chart: score per module
- Line chart: quiz attempts over time
- Progress circle: total completion

Technology:

- Recharts

---

### 7.7 User Profile Page

Only available when logged in.

#### Includes

- Basic account information
- Favorite places
- Bookmarked modules or sections
- Saved learning path
- Progress overview

---

### 7.8 Settings Page

#### Purpose

Allow the user to configure optional features.

#### Settings

- Language
- AI Tutor enabled/disabled
- Google AI Studio API key field
- Save settings button
- Short privacy note

Important:

The AI features should be disabled by default. They should only become available after the user provides a Gemini API key.

---

## 8. User Flows

### 8.1 Guest Learning Flow

```text
Home
→ Choose language
→ Start Exploring
→ Select module
→ Read content
→ Take quiz
→ View result
→ See recommendation
→ Continue to next module
```

---

### 8.2 Save Favorite Flow

```text
User opens map
→ Clicks place marker
→ Clicks Save Favorite
→ App asks user to login/register
→ User logs in
→ Favorite is saved
```

---

### 8.3 Adaptive Learning Flow

```text
User completes quiz
→ System calculates score
→ System detects weak categories
→ Dashboard updates
→ App recommends revision, next module, or advanced challenge
```

---

## 9. Adaptive Learning Logic

The application should implement medium-level adaptive learning.

### 9.1 Data Collected

The system should track:

- Module visits
- Sections completed
- Quiz attempts
- Question answers
- Correct and incorrect answers
- Score per quiz
- Time spent per module
- Weak categories
- Favorite places
- Bookmarked sections

---

### 9.2 Adaptation Rules

#### Rule 1 — Low Quiz Score

If a user scores below 60% in a module quiz, the system recommends:

- Repeat the module
- View simplified explanations
- Take an easier revision quiz
- Read specific weak sections

Example feedback:

```text
You had difficulty with volcanic formation. We recommend reviewing “How the Caldera Was Formed” before trying again.
```

---

#### Rule 2 — Medium Quiz Score

If the user scores between 60% and 79%, the system recommends:

- Short revision
- Mixed quiz
- One extra explanation
- Continue to the next module

Example feedback:

```text
Good progress. Before moving forward, review the key facts about Akrotiri and the volcanic eruption.
```

---

#### Rule 3 — High Quiz Score

If the user scores 80% or above, the system recommends:

- Continue to the next module
- Unlock advanced facts
- Try the final mixed challenge
- Explore related map points

Example feedback:

```text
Excellent work. You can now continue to the Volcano module or explore Akrotiri on the interactive map.
```

---

#### Rule 4 — Repeated Wrong Answers by Category

Each question should have a `category` field.

Example categories:

```text
history
mythology
volcano
environment
architecture
villages
gastronomy
```

If the user repeatedly fails questions in one category, the dashboard marks it as a weak area.

Example:

```text
Needs improvement: Volcano & Caldera
Recommended action: Review Module 2, Section 1.
```

---

#### Rule 5 — Preference-Based Recommendations

If the user saves several places related to a specific theme, the app can recommend related content.

Example:

```text
Since you saved Oia, Pyrgos, and Megalochori, you may enjoy the module about traditional villages and architecture.
```

---

## 10. Optional AI / Gemini Features

The AI features are optional and disabled by default.

The user must add a Google AI Studio API key in the settings page to enable them.

---

### AI Feature 1 — Santorini Tutor

A small assistant that answers questions about the current module.

Example:

```text
User: Why is Santorini’s caldera important?
AI: The caldera is important because it shows how volcanic activity shaped the island’s geography, history, and tourism identity.
```

---

### AI Feature 2 — Personalized Feedback After Quiz

After a quiz attempt, the app can send the user’s weak categories to Gemini and generate friendly feedback.

Example:

```text
You understood the villages well, but you had difficulty with volcanic formation. Review the caldera section and focus on how volcanic eruptions changed the island’s shape.
```

---

### AI Feature 3 — Dynamic Practice Questions

The app can generate extra practice questions based on weak topics.

Example prompt:

```text
Generate 3 beginner-level questions about Santorini’s volcano and caldera.
```

---

### AI Implementation Notes

For the one-week version:

- Keep AI simple.
- Add the API key input in settings.
- If no key exists, hide or disable AI features.
- Do not make AI required for the core functionality.
- Use AI only as a bonus enhancement.

---

## 11. Recommended Technology Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Leaflet / React Leaflet

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Authentication

- Simple login/register
- Guest-first access
- Login required only for favorites, bookmarks, and long-term saved profile data

### AI

- Gemini through Google AI Studio API key
- Optional setting controlled by the user

Final stack decision:

```text
Frontend: Next.js + TypeScript + Tailwind CSS
Backend: Next.js API Routes
Database: PostgreSQL
ORM: Prisma
Charts: Recharts
Map: Leaflet + OpenStreetMap
Authentication: Simple login/register
AI: Optional Gemini integration
```

---

## 12. Database Schema

### users

Stores registered users.

```sql
id
email
password_hash
name
preferred_language
created_at
updated_at
```

---

### guest_sessions

Stores guest progress before login.

```sql
id
session_token
created_at
last_seen_at
```

---

### modules

Stores the three learning modules.

```sql
id
slug
title_el
title_en
description_el
description_en
order_index
difficulty
estimated_minutes
created_at
updated_at
```

---

### module_sections

Stores content sections inside each module.

```sql
id
module_id
title_el
title_en
content_el
content_en
media_type
media_url
order_index
created_at
updated_at
```

---

### places

Stores map locations.

```sql
id
title_el
title_en
description_el
description_en
category
latitude
longitude
image_url
related_module_id
created_at
updated_at
```

---

### quizzes

Stores quizzes.

```sql
id
module_id
title_el
title_en
type
created_at
updated_at
```

Possible `type` values:

```text
module
review
final
```

---

### questions

Stores quiz questions.

```sql
id
quiz_id
question_el
question_en
type
category
difficulty
explanation_el
explanation_en
image_url
order_index
created_at
updated_at
```

Possible `type` values:

```text
multiple_choice
true_false
matching
image_choice
```

---

### question_options

Stores answer options.

```sql
id
question_id
text_el
text_en
is_correct
order_index
```

---

### quiz_attempts

Stores user attempts.

```sql
id
user_id
guest_session_id
quiz_id
score
total_questions
correct_answers
started_at
completed_at
time_spent_seconds
```

Either `user_id` or `guest_session_id` can be filled.

---

### user_answers

Stores detailed answers.

```sql
id
quiz_attempt_id
question_id
selected_option_id
is_correct
answered_at
```

---

### progress

Stores module progress.

```sql
id
user_id
guest_session_id
module_id
completed_sections
completion_percentage
last_visited_at
is_completed
```

---

### favorites

Only for logged-in users.

```sql
id
user_id
place_id
created_at
```

---

### bookmarks

Only for logged-in users.

```sql
id
user_id
module_id
section_id
created_at
```

---

### user_settings

Stores AI and preference settings.

```sql
id
user_id
gemini_api_key_encrypted
ai_enabled
language
created_at
updated_at
```

---

## 13. API Endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

---

### Modules

```text
GET /api/modules
GET /api/modules/:slug
GET /api/modules/:slug/sections
POST /api/progress/module
```

---

### Quizzes

```text
GET  /api/quizzes/:moduleSlug
POST /api/quizzes/:quizId/start
POST /api/quizzes/:quizId/submit
GET  /api/quizzes/:quizId/results
```

---

### Progress

```text
GET /api/progress
GET /api/progress/dashboard
GET /api/progress/recommendations
```

---

### Map / Places

```text
GET  /api/places
GET  /api/places/:id
POST /api/places/:id/favorite
DELETE /api/places/:id/favorite
```

---

### Bookmarks

```text
GET    /api/bookmarks
POST   /api/bookmarks
DELETE /api/bookmarks/:id
```

---

### AI

```text
POST /api/ai/tutor
POST /api/ai/quiz-feedback
POST /api/ai/generate-practice
```

---

## 14. Designer Brief

This section can be sent directly to the designer.

---

### Product Name

**Santorini Daily**

### Product Type

Responsive educational web application / digital museum guide.

### Purpose

The app helps tourists and the general public learn about Santorini through structured educational modules, interactive map exploration, quizzes, progress tracking, and personalized recommendations.

### Visual Style

The design should combine:

- Minimal luxury travel app
- Mediterranean / Aegean blue and white identity
- Academic educational platform
- Digital museum feeling

### Mood

Elegant, calm, premium, educational, trustworthy, and immersive.

### Color Direction

Suggested palette:

- Aegean blue
- Deep navy
- White
- Warm sand
- Light grey
- Subtle volcanic black or charcoal accent
- Optional sunset gold accent

Avoid overly saturated tourist colors.

### Typography

Use clean, modern typography.

Suggested style:

- Elegant headings
- Highly readable body text
- Clear hierarchy
- Good spacing

---

### Key Screens to Design

#### 1. Home Page

Include:

- Hero section
- Santorini image background or abstract illustration
- App title: Santorini Daily
- Subtitle
- Start Exploring button
- Three module cards
- Language switcher
- Login button

---

#### 2. Modules Page

Include:

- Three main learning module cards
- Progress indicator per module
- Estimated time
- Difficulty
- Continue button
- Recommended module badge

---

#### 3. Module Detail Page

Include:

- Title
- Learning objectives
- Content sections
- Image/video area
- Key facts sidebar
- Related places
- Take Quiz button

---

#### 4. Quiz Page

Include:

- Question card
- Progress through questions
- Answer options
- Feedback area
- Next button
- Final result screen

---

#### 5. Interactive Map Page

Include:

- Full map view
- Markers
- Category filter
- Place card popup
- Learn more button
- Save favorite button

---

#### 6. Progress Dashboard

Include:

- Overall progress
- Completed modules
- Quiz scores
- Weak areas
- Recommended next step
- Charts

---

#### 7. User Profile Page

Only for logged-in users.

Include:

- Basic profile info
- Favorite places
- Bookmarks
- Learning stats

---

#### 8. Settings Page

Include:

- Language setting
- AI Tutor toggle
- Gemini API key input
- Save settings button
- Small explanation that AI is optional

---

## 15. Development Roadmap

This roadmap replaces the daily breakdown and organizes the project into practical execution phases.

---

### Phase 1 — Project Foundation

#### Goal

Set up the technical base of the application and prepare the initial structure.

#### Main Tasks

- Create the Next.js project.
- Add TypeScript.
- Add Tailwind CSS.
- Add shadcn/ui or a similar component system.
- Set up PostgreSQL.
- Set up Prisma ORM.
- Define the initial database schema.
- Create the main application layout.
- Add navigation, footer, and language switcher placeholders.
- Prepare basic routing for all major pages.

#### Main Deliverables

- Running Next.js application.
- Connected PostgreSQL database.
- Prisma schema and migrations.
- Empty but accessible main pages.

---

### Phase 2 — Educational Content Structure

#### Goal

Implement the module system and make the educational content available through the application.

#### Main Tasks

- Create database records for the three learning modules.
- Create module sections.
- Add bilingual content fields.
- Build the modules listing page.
- Build the module detail page.
- Connect frontend pages with backend API routes.
- Add image and video placeholders.
- Add related places per module.

#### Main Deliverables

- Three complete learning modules.
- Module listing page.
- Module detail pages.
- Bilingual content support.

---

### Phase 3 — Quiz and Self-Assessment System

#### Goal

Implement activities and self-assessment for each learning module.

#### Main Tasks

- Create quizzes for each module.
- Create a final mixed review quiz.
- Add question types such as multiple-choice and true/false.
- Store questions and answer options in the database.
- Build the quiz UI.
- Implement quiz submission logic.
- Calculate scores.
- Store quiz attempts.
- Store user answers.
- Show explanations and feedback after submission.

#### Main Deliverables

- Working quiz system.
- Quiz for every module.
- Final mixed challenge.
- Stored quiz attempts and answers.
- Result screen with feedback.

---

### Phase 4 — Progress Tracking and Adaptive Learning

#### Goal

Implement database-backed progress tracking and personalized learning recommendations.

#### Main Tasks

- Track completed sections.
- Track module progress percentage.
- Track quiz performance.
- Track repeated wrong answers by category.
- Create dashboard API routes.
- Implement adaptive learning rules.
- Build progress dashboard UI.
- Add Recharts visualizations.
- Display recommended next actions.

#### Main Deliverables

- Progress dashboard.
- Score charts.
- Weak area detection.
- Adaptive learning recommendation engine.

---

### Phase 5 — Interactive Map and Tourist Exploration

#### Goal

Create the smart tourist guide part of the application through an interactive Santorini map.

#### Main Tasks

- Add Leaflet and React Leaflet.
- Add OpenStreetMap tile layer.
- Store important Santorini places in the database.
- Add map markers.
- Create marker popups.
- Add category filtering.
- Connect places to related learning modules.
- Add “Learn more” actions.
- Add “Save favorite” action for logged-in users.

#### Main Deliverables

- Interactive map page.
- Santorini points of interest.
- Place detail popups.
- Related module links.
- Favorite place functionality.

---

### Phase 6 — Authentication, Profile, and Bookmarks

#### Goal

Allow users to create simple accounts only when needed for saved personal data.

#### Main Tasks

- Implement basic register/login flow.
- Add user session handling.
- Protect favorites and bookmarks.
- Create profile page.
- Show saved favorites.
- Show saved bookmarks.
- Connect long-term progress to user account.

#### Main Deliverables

- Guest-first experience.
- Login/register functionality.
- User profile page.
- Favorites and bookmarks.

---

### Phase 7 — Optional AI Features with Gemini

#### Goal

Add optional AI-powered support without making it necessary for the core application.

#### Main Tasks

- Create settings page.
- Add Gemini API key input.
- Add AI enabled/disabled toggle.
- Create AI tutor API endpoint.
- Create AI quiz feedback endpoint.
- Create dynamic practice question endpoint.
- Hide AI features when no API key exists.

#### Main Deliverables

- Settings page with AI configuration.
- Optional Santorini Tutor.
- Optional AI-generated quiz feedback.
- Optional AI-generated practice questions.

---

### Phase 8 — Polish, Testing, and Delivery Preparation

#### Goal

Prepare the project for submission, presentation, and evaluation.

#### Main Tasks

- Improve responsive design.
- Test all pages on desktop and mobile.
- Test quiz submission.
- Test progress tracking.
- Test adaptive recommendations.
- Test map functionality.
- Test login, favorites, and bookmarks.
- Add final content and images.
- Prepare video demo.
- Prepare report/manual material.
- Prepare presentation talking points.

#### Main Deliverables

- Stable application.
- Source code ready for delivery.
- Video presentation ready.
- Manual/report structure ready.
- Oral presentation flow ready.

---

## 16. Minimum Viable Scope

Because the team has two people and limited time, the project should remain focused.

### Must-Have Features

- Responsive Next.js application
- Three educational modules
- Content per module
- Quiz per module
- Final mixed quiz
- PostgreSQL progress tracking
- Dashboard with charts
- Adaptive recommendations
- Interactive map
- Guest access
- Login/register for favorites and bookmarks
- Basic optional Gemini support

### Nice-to-Have Features

- Advanced animations
- Admin panel
- Complex AI tutor
- Gamification badges
- Dynamic route planner
- Certificate download

These should only be implemented if the must-have features are already complete.

---

## 17. Suggested Initial Content Amount

For each module:

- 3 sections
- 300–500 words per section
- 5–7 quiz questions
- 3–5 related places

Total recommended content:

- 9 educational sections
- Around 20 quiz questions
- 10–12 map places
- 1 final review quiz with 9–12 mixed questions

This amount is enough to make the project feel complete without becoming too large for the available time.

---

## 18. Suggested Folder Structure

```text
santorini-daily/
  app/
    page.tsx
    modules/
      page.tsx
      [slug]/
        page.tsx
        quiz/
          page.tsx
    map/
      page.tsx
    dashboard/
      page.tsx
    profile/
      page.tsx
    settings/
      page.tsx
    api/
      modules/
      quizzes/
      progress/
      places/
      favorites/
      ai/
  components/
    layout/
    modules/
    quiz/
    map/
    dashboard/
    ui/
  lib/
    prisma.ts
    auth.ts
    adaptive-learning.ts
    ai.ts
  prisma/
    schema.prisma
    seed.ts
  public/
    images/
  docs/
    report.tex
```

---

## 19. Report / Manual Structure

The assignment requires an Analysis and Design Manual. The following structure can be used for the PDF or LaTeX document.

### 1. Introduction

- Project title
- Assignment context
- Purpose of the application
- Target audience

### 2. Educational Problem

- Need for cultural and environmental tourism education
- Why Santorini was selected
- Learning objectives

### 3. Application Description

- General overview
- Main features
- User categories
- Guest and registered user behavior

### 4. Educational Design

- Pedagogical approach
- Module structure
- Self-assessment design
- Feedback strategy
- Adaptive learning approach

### 5. Functional Requirements

Examples:

- The user can browse educational modules.
- The user can complete quizzes.
- The system records quiz attempts.
- The system presents progress statistics.
- The system recommends revision material.
- The user can explore map points.
- Registered users can save favorites.

### 6. Non-Functional Requirements

Examples:

- Responsive design
- Usability
- Accessibility
- Performance
- Data privacy
- Maintainability

### 7. System Architecture

- Frontend
- Backend
- Database
- API routes
- AI integration

### 8. Database Design

- Tables
- Relationships
- ER diagram

### 9. User Interface Design

- Main screens
- Navigation flow
- Design principles
- Responsive behavior

### 10. Adaptive Learning Mechanism

- Data collected
- Rules
- Recommendations
- Example scenarios

### 11. Implementation Technologies

- Next.js
- PostgreSQL
- Prisma
- Recharts
- Leaflet
- Gemini API

### 12. Testing

- Functional testing
- Quiz testing
- Progress tracking testing
- Responsive testing
- User flow testing

### 13. Conclusions

- What was achieved
- Educational value
- Possible future improvements

---

## 20. Presentation / Demo Flow

Use this flow for the final video and oral presentation.

```text
1. Open home page
2. Switch language
3. Open modules page
4. Enter History module
5. Read a content section
6. Take quiz
7. Submit answers
8. Show result and feedback
9. Open dashboard
10. Show adaptive recommendation
11. Open map
12. Click Santorini locations
13. Try to save favorite
14. Login/register
15. Save favorite
16. Open profile
17. Show bookmarks/favorites
18. Open settings
19. Show optional Gemini API key setting
```

---

## 21. Final Summary

**Santorini Daily** will be a bilingual, responsive educational web application that presents Santorini as a digital museum and smart tourist guide. It will include three structured learning modules, interactive quizzes, a final mixed challenge, an interactive map, progress tracking, adaptive learning recommendations, and optional AI tutor functionality through Gemini.

The project is realistic for a two-person team if the scope remains focused. The strongest evaluation points will be the combination of educational structure, database-backed progress tracking, adaptive learning, interactive map exploration, and clean visual presentation.
