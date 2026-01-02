/**
 * Mock Data: Users
 * Contains mock user data for development
 */

export interface MockUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  settings: {
    language: string;
    soundEnabled: boolean;
    musicEnabled: boolean;
    vibrationEnabled: boolean;
    notificationsEnabled: boolean;
  };
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user-001',
    email: 'player1@infinite-battle.com',
    displayName: 'DragonMaster',
    avatarUrl: '/images/avatars/avatar-01.png',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-15T12:30:00.000Z',
    settings: {
      language: 'en',
      soundEnabled: true,
      musicEnabled: true,
      vibrationEnabled: true,
      notificationsEnabled: true,
    },
  },
  {
    id: 'user-002',
    email: 'player2@infinite-battle.com',
    displayName: 'ShadowNinja',
    avatarUrl: '/images/avatars/avatar-02.png',
    createdAt: '2024-01-05T00:00:00.000Z',
    updatedAt: '2024-01-20T18:45:00.000Z',
    settings: {
      language: 'en',
      soundEnabled: true,
      musicEnabled: false,
      vibrationEnabled: true,
      notificationsEnabled: false,
    },
  },
  {
    id: 'user-003',
    email: 'player3@infinite-battle.com',
    displayName: 'FireLord',
    avatarUrl: '/images/avatars/avatar-03.png',
    createdAt: '2024-01-10T00:00:00.000Z',
    updatedAt: '2024-01-25T09:15:00.000Z',
    settings: {
      language: 'th',
      soundEnabled: true,
      musicEnabled: true,
      vibrationEnabled: false,
      notificationsEnabled: true,
    },
  },
];

export const getMockUserById = (id: string): MockUser | undefined => {
  return MOCK_USERS.find((user) => user.id === id);
};

export const getMockUserByEmail = (email: string): MockUser | undefined => {
  return MOCK_USERS.find((user) => user.email === email);
};

export const CURRENT_MOCK_USER = MOCK_USERS[0];
