// 👇 START WORKING ON LINE 36 (the set up is done for you -> go straight to writing tests)
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../backend/mock-server'
import Auth from './Auth'

describe('Auth component', () => {
  // ❗ mock API setup
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })

  let userInput, passInput, loginBtn // ❗ DOM nodes of interest
  let user // ❗ tool to simulate interaction with the DOM

  beforeEach(() => {
    // ❗ render the component to test
    render(<Auth />)
    // ❗ set up the user variable
    user = userEvent.setup()
    // ❗ set the DOM nodes of interest into their variables
    userInput = screen.getByPlaceholderText('type username')
    passInput = screen.getByPlaceholderText('type password')
    loginBtn = screen.getByTestId('loginBtn')
  })

  // ❗ These are the users registered in the testing database
  const registeredUsers = [
    { id: 1, username: 'Shakira', born: 1977, password: 'Suerte1977%' },
    { id: 2, username: 'Beyoncé', born: 1981, password: 'Halo1981#' },
    { id: 3, username: 'UtadaHikaru', born: 1983, password: 'FirstLove1983;' },
    { id: 4, username: 'Madonna', born: 1958, password: 'Vogue1958@' },
  ]

  // 👇 START WORKING HERE
  test('[1] Inputs acquire the correct values when typed on', async () => {
    
    // ✨ type some text in the username input (done for you)
    await user.type(userInput, 'gabe')
    expect(userInput).toHaveValue('gabe')

    await user.type(passInput, 'password123') 
    expect(passInput).toHaveValue('password123')
   
   
  })
  test('[2] Submitting form clicking button shows "Please wait..." message', async () => {
    await user.type(userInput, 'gabe')
    await user.type(passInput, 'password123')
    await user.click(loginBtn)
    expect(screen.getByText(/please wait.../i)).toBeInTheDocument()
    
  })
  test('[3] Submitting form typing [ENTER] shows "Please wait..." message', async () => {
    await user.type(userInput, 'gabe')
    // ✨ hit the [ENTER] key on the keyboard
    await user.type(passInput, 'password123')
    await user.type(passInput,'{enter}')
    // ✨ assert that the "Please wait..." message is visible in the DOM
    expect(screen.getByText(/please wait.../i)).toBeInTheDocument()
    
  })
  test('[4] Submitting an empty form shows "Invalid Credentials" message', async () => {
    await user.click(loginBtn)
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
  test('[5] Submitting incorrect credentials shows "Invalid Credentials" message', async () => {
    await user.type(userInput, 'wronguser')
    await user.type(passInput, 'wrongpass')
    await user.click(loginBtn)
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
  for (const usr of registeredUsers) {
    test(`[6.${usr.id}] Logging in ${usr.username} makes the following elements render:
        - correct welcome message
        - correct user info (ID, username, birth date)
        - logout button`, async () => {

      await user.type(userInput, usr.username)
      await user.type(passInput, usr.password)
      await user.click(loginBtn)

      await waitFor(() => {
        expect(screen.getByText(new RegExp(`Welcome back, ${usr.username}. We LOVE you!`, 'i'))).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(screen.getByText(new RegExp(`ID: ${usr.id}, Username: ${usr.username}, Born: ${usr.born}`, 'i'))).toBeInTheDocument()
      })
        expect(screen.getByTestId('logoutBtn')).toBeInTheDocument()
      })
  }
  test('[7] Logging out a logged-in user displays goodbye message and renders form', async () => {
    await user.type(userInput, 'Shakira')
    await user.type(passInput, 'Suerte1977%')
    await user.click(loginBtn)
    // Wait for welcome message 
    await waitFor(() => {
      expect(screen.getByText(/welcome back, Shakira/i)).toBeInTheDocument()
    })
    // Perform logout action
    const logoutBtn = screen.getByTestId('logoutBtn')
    await waitFor(() => expect(logoutBtn).toBeInTheDocument())
    //Click on the logout button
    await user.click(logoutBtn)
  
    // Check for goodbye message and reappearance of the login form
    await waitFor(() => {
      expect(screen.getByText(/Bye! Please, come back soon./i)).toBeInTheDocument()
    })
    // Confirm the login forn reappears
    await waitFor(() => {
      expect(screen.getByTestId('loginForm')).toBeInTheDocument()
     })
   })
})