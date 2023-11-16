import { LoginForm } from '@/components/ui/Forms/LoginForm'
import { RegisterForm } from '@/components/ui/Forms/RegisterForm'

export default function Page() {
  return (
    <div className='mt-8 max-w-screen-xl mx-auto'>
      <h3 className='mb-12 text-center text-2xl'>Register your account</h3>
      <RegisterForm />
    </div>
  )
}
