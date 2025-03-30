import { patients } from './patients'

export interface Message {
    id: string
    content: string
    senderId: string
    receiverId: string
    timestamp: string
    isRead: boolean
    isSentByMe: boolean
}

export interface Conversation {
    id: string
    patientId: string
    lastMessageAt: string
    messages: Message[]
    unreadCount: number
}

// Helper to generate a random ISO date in the last 7 days
const getRandomRecentDate = () => {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 7))
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
    return date.toISOString()
}

// Generate mock conversations from our patient data
export const conversations: Conversation[] = patients.map((patient) => {
    const messages: Message[] = []
    const messageCount = Math.floor(Math.random() * 20) + 3 // 3-22 messages per conversation

    // Generate a series of messages for this conversation
    for (let i = 0; i < messageCount; i++) {
        const isSentByMe = Math.random() > 0.5
        const timestamp = getRandomRecentDate()

        messages.push({
            id: `msg-${patient.id}-${i}`,
            content: getMessageContent(i, isSentByMe, patient.name),
            senderId: isSentByMe ? 'doctor' : patient.id,
            receiverId: isSentByMe ? patient.id : 'doctor',
            timestamp,
            isRead: Math.random() > 0.3,
            isSentByMe
        })
    }

    // Sort messages by timestamp
    messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    const lastMessage = messages[messages.length - 1]
    const unreadCount = messages.filter(m => !m.isRead && !m.isSentByMe).length

    return {
        id: `conv-${patient.id}`,
        patientId: patient.id,
        lastMessageAt: lastMessage.timestamp,
        messages,
        unreadCount
    }
})

// Sort conversations by most recent message
conversations.sort((a, b) =>
    new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
)

// Helper function to generate realistic message content
function getMessageContent(index: number, isSentByMe: boolean, patientName: string): string {
    const doctorMessages = [
        `Hello ${patientName}, how are you feeling today?`,
        `Have you been taking your medication as prescribed?`,
        `Your test results look promising.`,
        `We should schedule a follow-up appointment soon.`,
        `Please let me know if you're experiencing any side effects.`,
        `I'm glad to hear you're feeling better.`,
        `Remember to stay hydrated and get plenty of rest.`,
        `Is the new medication working for you?`,
        `Your blood pressure readings are improving, that's good news.`,
        `I've reviewed your case with the specialist, and they agree with our approach.`,
        `Don't hesitate to reach out if you have any concerns.`
    ]

    const patientMessages = [
        `Good morning doctor, I'm feeling much better today.`,
        `Yes, I've been taking all my medications as instructed.`,
        `I'm still experiencing some discomfort in my chest when I exercise.`,
        `When would be a good time for my next appointment?`,
        `I've been logging my symptoms as you asked.`,
        `The pain has decreased significantly since last week.`,
        `I'm concerned about some of these side effects.`,
        `My family has noticed an improvement in my energy levels.`,
        `Is it normal to feel dizzy after taking the new medication?`,
        `Thank you for your help and support.`,
        `Should I continue with the same dosage?`
    ]

    const messageArray = isSentByMe ? doctorMessages : patientMessages
    return messageArray[index % messageArray.length]
} 