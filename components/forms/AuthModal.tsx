
import gsap from 'gsap';
import { X } from 'lucide-react';
import  {  useState } from 'react';
import SigninForm from './SigninForm';
import OAuthButton from './OAuthButton';
import { facebookIcon, githubIcon,googleIcon } from '@/public/icons';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import SignupForm from './SignupForm';
import { useAuthStore } from '@/store/auth.store';
import { signinSocial } from '@/lib/actions/auth-actions';
import { useRouter } from 'next/navigation';

const AuthModal = ({ label, btnClass }: { label: string; btnClass?: string }) => {

    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null)
    const {setIsSignin, isSignin} = useAuthStore();

    useGSAP(()=> {

        if(!modalRef.current) return

        gsap.set(modalRef.current, {
            opacity: 0,
            scale: 0.5,
            autoAlpha: 0
        })
        gsap.to(modalRef.current, {
            autoAlpha: isOpen ? 1 : 0,
        

            scale: isOpen ? 1 : 0.5,
            ease: 'power1.inOut',
            duration: 0.3
        })
    }, [isOpen])

    const handleSocialAuth = async (provider : "google" | "github" | "facebook")=>{
        try {
             const url = await signinSocial(provider);

              if (url) {
                // Full-page redirect
                window.location.href = url;
                }

     

            
        } catch (error) {
            console.log('Error in handle Social Auth: ', error);
        }

    }


  return (
    <div>
      <button className={btnClass} onClick={() => setIsOpen(true)}>
        {label}
      </button>

            {isOpen && (
                /* BACKDROP: Centering logic with flex */
                <div 
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
                onClick={() => setIsOpen(false)}
                >
                    {/* MODAL BOX: stopPropagation prevents closing when clicking inside */}
                    <div 
                        className="bg-white p-8 rounded-lg relative w-full max-w-md shadow-2xl text-sm font-normal"
                        onClick={(e) => e.stopPropagation()} 
                        ref={modalRef}
                    >
                        
                        {/* ABSOLUTE CLOSE BUTTON */}
                        <button 
                        onClick={() => setIsOpen(false)} 
                        className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors cursor-pointer"
                        >
                        <X strokeWidth={1.5} size={24} />
                        </button>

                    
                        <div className="text-center space-y-2 mb-6 font-normal">
                            <h2 className="text-2xl font-semibold text-gray-800">{isSignin ? 'Login your account' : 'Sign Up'}</h2>
                            <p className="text-xs text-gray-500">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, beatae!
                            </p>
                        </div>


                        <div className='space-y-6'>
                            {isSignin ? <SigninForm/> : <SignupForm/>}
                            
                            {isSignin ? 

                            <>
                                {/* DIVIDER */}
                                <div className='flex items-center gap-4'>
                                    <div className='bg-zinc-400 w-full h-px'></div>
                                    <span>or</span>
                                    <div className='bg-zinc-400 w-full h-px'></div>
                                </div>

                                <div className='space-y-2'>
                                    <OAuthButton label='Sign in with Google' icon={googleIcon} onClick={()=> handleSocialAuth('google')}/>
                                    <OAuthButton label='Sign in with Github' icon={githubIcon} onClick={()=> handleSocialAuth('github')}/>
                                    
                                </div>

                            </>

                            : ''}

                             <p className='text-center font-normal text-xs'>
                                {isSignin ? 'Need an account?' : 'Already have an account?'}
                                  
                                <span className='ml-1 underline hover:text-blue-400 cursor-pointer' onClick={()=> setIsSignin( isSignin ? false : true)}> 
                                    {isSignin ? 'Sign up' : 'Sign in'}
                                     
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
};

export default AuthModal;