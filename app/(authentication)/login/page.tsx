import { LoginForm } from '@/components/ui/Forms/LoginForm'

export default function Page() {
  return (
    <div className='mt-8 max-w-screen-xl mx-auto'>
      <h3 className='mb-16 text-center text-2xl'>Log in to your account</h3>
      <LoginForm />
    </div>
  )
}
