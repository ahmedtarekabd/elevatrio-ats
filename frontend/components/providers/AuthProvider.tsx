// import { ReactNode, createContext, useEffect, useState } from 'react'

// const AuthContext = createContext<{
//   token: string | null
//   username: string | null
//   role: string | null
//   email: string | null
//   id: string | null
// }>({ 
//   token: null,
//   username: null,
//   role: null,
//   email: null,
//   id: null,
//  })

// const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem('jwt'),
//   )
//   const [jwt, setJwt] = useState<string | null>(
//     localStorage.getItem('jwt'),
//   )

//   // useEffect to listen for localStorage changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem('jwt'))
//     }

//     // Add event listener for storage changes
//     window.addEventListener('storage', handleStorageChange)

//     // Cleanup function to remove listener on unmount
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   return (
//     <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
//   )
// }

// export { AuthContext, AuthProvider }
