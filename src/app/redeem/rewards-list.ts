import { Reward } from './reward'

const SHOPPING: Reward[] = [
    {   
        id: 1,
        name: 'test1',
        imageUrl: 'laptop.png',
        description: 'lorem ipsum',
        points: 1000
    },
    {   
        id: 2,
        name: 'test2',
        imageUrl: 'download.jpg',
        description: 'lorem ipsum',
        points: 2000
    },
    {   
        id: 3,
        name: 'test3',
        imageUrl: '6814952_sa.jpg',
        description: 'lorem ipsum',
        points: 3000
    }
]
const GIFTCARDS: Reward[] = [
    {   
        id: 4,
        name: 'test1',
        imageUrl: 'laptop.png',
        description: 'lorem ipsum',
        points: 1000
    },
    {   
        id: 4,
        name: 'test2',
        imageUrl: 'download.jpg',
        description: 'lorem ipsum',
        points: 2000
    },
    {   
        id: 4,
        name: 'test3',
        imageUrl: '6814952_sa.jpg',
        description: 'lorem ipsum',
        points: 3000
    }
]
const TRAVEL: Reward[] = [
    {   
        id: 4,
        name: 'test1',
        imageUrl: 'laptop.png',
        description: 'lorem ipsum',
        points: 1000
    },
    {   
        id: 4,
        name: 'test2',
        imageUrl: 'download.jpg',
        description: 'lorem ipsum',
        points: 2000
    },
    {   
        id: 4,
        name: 'test3',
        imageUrl: '6814952_sa.jpg',
        description: 'lorem ipsum',
        points: 3000
    }
]

export const REWARDS = {
    shopping: SHOPPING,
    giftCards: GIFTCARDS,
    travel: TRAVEL
}
