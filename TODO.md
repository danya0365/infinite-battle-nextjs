# Infinite Battle - TODO List

## 🎯 Project Overview
สร้างเว็บแอพ Infinite Battle ตามแบบ Dragon Ball Legends ด้วย Next.js 14 + React Three Fiber + React Spring + Colyseus + PeerJS + Supabase

---

## 📁 Project Structure (Clean Architecture)

```
infinite-battle-nextjs/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   ├── profile/                      # Profile management
│   ├── battle/                       # Battle mode
│   ├── roster/                       # Character roster
│   ├── match-history/                # Match history
│   └── settings/                     # Settings
├── src/
│   ├── domain/                       # Domain Layer (Entity, Value Objects)
│   │   ├── entities/                 
│   │   │   ├── User.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Character.ts
│   │   │   ├── Battle.ts
│   │   │   ├── Match.ts
│   │   │   └── Card.ts
│   │   └── value-objects/
│   │       ├── UserId.ts
│   │       ├── ProfileId.ts
│   │       └── CharacterId.ts
│   ├── application/                  # Application Layer (Use Cases)
│   │   ├── repositories/            # Repository Interfaces
│   │   │   ├── IUserRepository.ts
│   │   │   ├── IProfileRepository.ts
│   │   │   ├── ICharacterRepository.ts
│   │   │   └── IMatchRepository.ts
│   │   └── use-cases/
│   │       ├── user/
│   │       ├── profile/
│   │       ├── character/
│   │       └── battle/
│   ├── infrastructure/               # Infrastructure Layer (External Services)
│   │   ├── config/
│   │   │   ├── supabase-server-client.ts
│   │   │   └── supabase-client-client.ts
│   │   └── repositories/
│   │       ├── mock/                # Mock Repositories
│   │       │   ├── MockUserRepository.ts
│   │       │   ├── MockProfileRepository.ts
│   │       │   ├── MockCharacterRepository.ts
│   │       │   └── MockMatchRepository.ts
│   │       └── supabase/            # Supabase Repositories (Later)
│   │           ├── SupabaseUserRepository.ts
│   │           ├── SupabaseProfileRepository.ts
│   │           ├── SupabaseCharacterRepository.ts
│   │           └── SupabaseMatchRepository.ts
│   ├── presentation/                 # Presentation Layer
│   │   ├── components/
│   │   │   ├── layouts/             # Layout Components
│   │   │   │   ├── main/            # MainLayout (Modern)
│   │   │   │   │   ├── MainLayout.tsx
│   │   │   │   │   ├── MainHeader.tsx
│   │   │   │   │   ├── MainFooter.tsx
│   │   │   │   │   └── MainComponents/     # Reusable Main Components
│   │   │   │   │       ├── MainModal.tsx
│   │   │   │   │       ├── MainForm.tsx
│   │   │   │   │       ├── MainInput.tsx
│   │   │   │   │       ├── MainSelect.tsx
│   │   │   │   │       ├── MainButton.tsx
│   │   │   │   │       └── MainPopover.tsx
│   │   │   │   └── retro/           # RetroLayout (IE5 Style)
│   │   │   │       ├── RetroLayout.tsx
│   │   │   │       ├── RetroHeader.tsx
│   │   │   │       ├── RetroFooter.tsx
│   │   │   │       └── RetroComponents/    # Reusable Retro Components
│   │   │   │           ├── RetroModal.tsx
│   │   │   │           ├── RetroForm.tsx
│   │   │   │           ├── RetroInput.tsx
│   │   │   │           ├── RetroSelect.tsx
│   │   │   │           ├── RetroButton.tsx
│   │   │   │           └── RetroPopover.tsx
│   │   │   ├── home/                # Home page components
│   │   │   │   ├── HomeView.tsx
│   │   │   │   ├── main/            # Main layout home components
│   │   │   │   │   └── MainHomeContent.tsx
│   │   │   │   └── retro/           # Retro layout home components
│   │   │   │       └── RetroHomeContent.tsx
│   │   │   ├── profile/
│   │   │   ├── battle/
│   │   │   ├── roster/
│   │   │   └── match-history/
│   │   ├── presenters/
│   │   │   ├── home/
│   │   │   ├── profile/
│   │   │   ├── battle/
│   │   │   └── roster/
│   │   └── stores/
│   │       ├── authStore.ts
│   │       ├── layoutStore.ts       # Layout toggle state
│   │       ├── themeStore.ts
│   │       ├── profileStore.ts
│   │       └── battleStore.ts
│   └── data/
│       ├── master/                  # Master Data
│       │   ├── characters.ts
│       │   ├── skills.ts
│       │   ├── cards.ts
│       │   └── stages.ts
│       └── mock/                    # Mock Data
│           ├── users.ts
│           ├── profiles.ts
│           ├── matches.ts
│           └── battles.ts
└── public/
    └── styles/
        ├── index.css
        ├── main-layout.css          # MainLayout styles
        └── retro-layout.css         # RetroLayout styles (IE5 theme)
```

---

## ✅ Phase 1: Foundation Setup

### 1.1 Project Structure ✅ COMPLETED
- [x] Create TODO.md
- [x] Install dependencies
  - [x] `next-themes` (Theme Toggle)
  - [x] `@react-spring/web` (Animations)
  - [x] `zustand` (State Management)
  - [ ] `react-three-fiber` (3D - for later)
  - [ ] `@supabase/supabase-js` (Backend - for later)
- [x] Create folder structure

### 1.2 Master Data & Mock Data ✅ COMPLETED
- [x] Create master data files
  - [x] `src/data/master/characters.ts`
  - [x] `src/data/master/skills.ts`
  - [x] `src/data/master/cards.ts`
  - [x] `src/data/master/stages.ts`
- [x] Create mock data files
  - [x] `src/data/mock/users.ts`
  - [x] `src/data/mock/profiles.ts`
  - [x] `src/data/mock/matches.ts`
  - [x] `src/data/mock/battles.ts`

### 1.3 Domain Layer
- [ ] Create entities (TO BE DONE LATER)
  - [ ] `src/domain/entities/User.ts`
  - [ ] `src/domain/entities/Profile.ts`
  - [ ] `src/domain/entities/Character.ts`
  - [ ] `src/domain/entities/Battle.ts`
  - [ ] `src/domain/entities/Match.ts`
  - [ ] `src/domain/entities/Card.ts`

### 1.4 Repository Interfaces & Mock Implementation (TO BE DONE LATER)
- [ ] Create repository interfaces
  - [ ] `src/application/repositories/IUserRepository.ts`
  - [ ] `src/application/repositories/IProfileRepository.ts`
  - [ ] `src/application/repositories/ICharacterRepository.ts`
  - [ ] `src/application/repositories/IMatchRepository.ts`
- [ ] Create mock repositories
  - [ ] `src/infrastructure/repositories/mock/MockUserRepository.ts`
  - [ ] `src/infrastructure/repositories/mock/MockProfileRepository.ts`
  - [ ] `src/infrastructure/repositories/mock/MockCharacterRepository.ts`
  - [ ] `src/infrastructure/repositories/mock/MockMatchRepository.ts`

---

## ✅ Phase 2: Layout System ✅ COMPLETED

### 2.1 Theme & Layout Stores ✅ COMPLETED
- [x] Create `src/presentation/stores/layoutStore.ts` (MainLayout/RetroLayout toggle)
- [x] Create `src/presentation/stores/authStore.ts` (Auth state)
- [x] Create `src/presentation/stores/battleStore.ts` (Battle state)
- [x] Create `src/presentation/stores/profileStore.ts` (Profile state)

### 2.2 CSS Setup (Tailwind v4) ✅ COMPLETED
- [x] Update `public/styles/index.css`
- [x] Create `public/styles/main-layout.css`
  - Modern, glassmorphism, gradient
  - Dark mode support
  - Animation utilities
- [x] Create `public/styles/retro-layout.css`
  - Windows 98 / IE5 style
  - Classic blue title bar
  - Gray 3D borders
  - System fonts

### 2.3 MainLayout (Modern Design) ⚡ ✅ COMPLETED
- [x] Create `src/presentation/components/layouts/main/MainLayout.tsx`
  - Full screen, no scroll
  - Premium glassmorphism UI
  - Animated with react-spring
- [x] Create `src/presentation/components/layouts/main/MainHeader.tsx`
  - Navigation
  - Theme Toggle (Dark/Light)
  - Layout Toggle (Main/Retro)
- [x] Create `src/presentation/components/layouts/main/MainFooter.tsx`
- [x] Create Main Reusable Components:
  - [x] `MainModal.tsx`
  - [x] `MainForm.tsx`
  - [x] `MainInput.tsx`
  - [x] `MainSelect.tsx`
  - [x] `MainButton.tsx`
  - [x] `MainPopover.tsx`

### 2.4 RetroLayout (IE5 Style) 🖥️ ✅ COMPLETED
- [x] Create `src/presentation/components/layouts/retro/RetroLayout.tsx`
  - Full screen, no scroll
  - IE5 Browser frame design
  - Classic Windows 98 look
- [x] Create `src/presentation/components/layouts/retro/RetroHeader.tsx`
  - IE5 toolbar (Back, Forward, Stop, Refresh, Home, Search, Favorites, History)
  - Address bar
  - Links bar (optional)
- [x] Create `src/presentation/components/layouts/retro/RetroFooter.tsx`
  - IE5 status bar
- [x] Create Retro Reusable Components:
  - [x] `RetroModal.tsx` (Windows 98 dialog)
  - [x] `RetroForm.tsx`
  - [x] `RetroInput.tsx` (Classic textbox)
  - [x] `RetroSelect.tsx` (Classic dropdown)
  - [x] `RetroButton.tsx` (3D beveled button)
  - [x] `RetroPopover.tsx`

### 2.5 Theme Provider Setup ✅ COMPLETED
- [x] Update `app/layout.tsx` with ThemeProvider (next-themes)
- [x] Create LayoutProvider component
- [x] Create Providers wrapper component

---

## ✅ Phase 3: Home Page ✅ COMPLETED

### 3.1 Home Page Components ✅ COMPLETED
- [x] Create `app/page.tsx` (Server Component following pattern)
- [x] Create `src/presentation/presenters/home/HomePresenter.ts`
- [x] Create `src/presentation/presenters/home/HomePresenterServerFactory.ts`
- [x] Create `src/presentation/presenters/home/HomePresenterClientFactory.ts`
- [x] Create `src/presentation/presenters/home/useHomePresenter.ts`
- [x] Create `src/presentation/components/home/HomeView.tsx`

### 3.2 Layout-Specific Home Content ✅ COMPLETED
- [x] Create `src/presentation/components/home/main/MainHomeContent.tsx`
  - Hero section with animations
  - Feature cards
  - Battle preview
  - Start button
- [x] Create `src/presentation/components/home/retro/RetroHomeContent.tsx`
  - IE5 style content
  - Classic web page feel
  - Retro graphics

---

## ✅ Phase 4: Core Features (After Layout Complete)

### 4.1 Profile Management
- [ ] Create profile page
- [ ] Create ProfilePresenter
- [ ] Create ProfileView (Main & Retro)
- [ ] Profile CRUD operations

### 4.2 Character Roster
- [ ] Create roster page
- [ ] Character list view
- [ ] Character detail view
- [ ] Character selection

### 4.3 Battle System
- [ ] Battle page setup
- [ ] Card-based combat UI
- [ ] Touch controls
- [ ] Battle animations

### 4.4 Match History
- [ ] Match history page
- [ ] Match details view
- [ ] Statistics

---

## ✅ Phase 5: Backend Integration (Supabase)

- [ ] Create Supabase repositories
- [ ] Authentication
- [ ] Database integration
- [ ] Real-time features

---

## ✅ Phase 6: Advanced Features

- [ ] React Three Fiber 3D battle scenes
- [ ] Colyseus real-time multiplayer
- [ ] PeerJS peer-to-peer connections
- [ ] PWA with offline support

---

## 🎨 Design References

### MainLayout Design:
- Modern gradient backgrounds
- Glassmorphism cards
- Smooth animations with react-spring
- Dragon Ball inspired energy effects
- Vibrant color scheme

### RetroLayout Design:
- Internet Explorer 5 on Windows 98
- Blue title bar with gradient
- Gray 3D beveled buttons
- Classic system fonts (MS Sans Serif)
- Address bar with "Go" button
- Standard web browser toolbar

---

## 📝 Notes

1. **Mock First Strategy**: ใช้ mock repositories ก่อน แล้วค่อยเปลี่ยนเป็น Supabase ภายหลัง
2. **Layout Switching**: ผู้ใช้สามารถสลับ layout ได้ตลอดเวลาผ่านปุ่มใน Header
3. **Full Screen Design**: ทั้ง MainLayout และ RetroLayout ต้องเป็น full screen ห้าม scroll
4. **Component Separation**: แยก components ตาม layout (Main/Retro) เพื่อให้จัดการง่าย
5. **SOLID Principles**: ทุกไฟล์ต้องเขียนตามหลัก Clean Architecture + SOLID

---

## 🚀 Current Sprint

**Sprint 1: Layout Foundation**
- ติดตั้ง dependencies
- สร้าง MainLayout และ RetroLayout
- สร้าง reusable components
- สร้างหน้า Home page

---

*Last Updated: 2026-01-02*
