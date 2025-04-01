export const useSession = () => {
    // 세션에 저장할 데이터와 키를 받아 저장하는 함수
    const setSession = (key: string, items: unknown) => {
        sessionStorage.setItem(key, JSON.stringify(items))
    }

    // 세션에서 키에 해당하는 데이터를 가져오는 함수
    const getSession = (key: string) => {
        const sessionData = sessionStorage.getItem(key)
        return sessionData ? JSON.parse(sessionData) : null
    }

    // 세션에서 특정 키를 제거하는 함수
    const removeSession = (key: string) => {
        sessionStorage.removeItem(key)
    }

    // 세션 전체를 비우는 함수
    const clearSession = () => {
        sessionStorage.clear()
    }

    return { setSession, getSession, removeSession, clearSession }
}
