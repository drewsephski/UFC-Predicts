import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Shield, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | UFC Predict",
  description: "Learn about how UFC Predict collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-red-950/30">
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0 z-0"
          quantity={300}
          color="#ff3333"
          ease={100}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Privacy <span className="text-red-500">Policy</span>
          </h1>
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-gray-300">Last Updated: April 15, 2024</p>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            This Privacy Policy explains how UFC Predict collects, uses, and protects your 
            personal information when you use our website and services. We are committed to 
            ensuring the privacy and security of your data.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-black/30 border border-red-500/20 rounded-lg p-8 mb-12">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">1. <span className="text-red-500">Information We Collect</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We collect the following types of information when you use UFC Predict:
                </p>
                
                <h3 className="text-lg font-semibold text-white mt-4">1.1 Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Account information (name, email address, username, password)</li>
                  <li>Profile information (profile picture, bio, location)</li>
                  <li>Payment information when you subscribe to premium services</li>
                  <li>Content you post in community forums or discussions</li>
                  <li>Predictions you submit for contests or events</li>
                  <li>Communications with our support team</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-white mt-4">1.2 Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent on site, actions taken)</li>
                  <li>Location information (general location based on IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">2. <span className="text-red-500">How We Use Your Information</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We use the information we collect for the following purposes:
                </p>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Personalize your experience and content</li>
                  <li>Communicate with you about updates, promotions, and news</li>
                  <li>Analyze usage patterns to improve our platform</li>
                  <li>Protect the security and integrity of our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">3. <span className="text-red-500">Sharing Your Information</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may share your information with the following third parties:
                </p>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Service providers who help us operate our platform</li>
                  <li>Payment processors for subscription management</li>
                  <li>Analytics providers to help us improve our services</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                
                <p className="mt-4">
                  We do not sell your personal information to third parties. Any sharing of information 
                  is done with appropriate safeguards to protect your privacy.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">4. <span className="text-red-500">Cookies and Tracking Technologies</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We use cookies and similar tracking technologies to collect information about your 
                  browsing activities. These technologies help us:
                </p>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you interact with our platform</li>
                  <li>Improve our services based on usage patterns</li>
                  <li>Provide personalized content and recommendations</li>
                </ul>
                
                <p className="mt-4">
                  You can manage your cookie preferences through your browser settings. However, 
                  disabling certain cookies may limit your ability to use some features of our platform.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">5. <span className="text-red-500">Data Security</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal information from unauthorized access, disclosure, alteration, or destruction. 
                  These measures include:
                </p>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Encryption of sensitive data</li>
                  <li>Regular security assessments</li>
                  <li>Access controls for our systems</li>
                  <li>Employee training on data protection</li>
                </ul>
                
                <p className="mt-4">
                  While we strive to protect your information, no method of transmission over the 
                  internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">6. <span className="text-red-500">Your Rights and Choices</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Data portability (receiving your data in a structured format)</li>
                  <li>Withdraw consent for processing based on consent</li>
                </ul>
                
                <p className="mt-4">
                  To exercise these rights, please contact us using the information provided in the 
                  &quot;Contact Us&quot; section below.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">7. <span className="text-red-500">Children&apos;s Privacy</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly 
                  collect personal information from children. If you believe we have collected information 
                  from a child, please contact us immediately.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">8. <span className="text-red-500">Changes to This Privacy Policy</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or legal requirements. We will notify you of any material changes by posting the updated 
                  policy on our website and updating the &quot;Last Updated&quot; date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically to stay informed about how 
                  we collect, use, and protect your information.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">9. <span className="text-red-500">Contact Us</span></h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                  data practices, please contact us at:
                </p>
                
                <div className="bg-black/50 p-4 rounded-lg border border-red-500/10 mt-4">
                  <p className="font-semibold text-white">UFC Predict</p>
                  <p>Email: privacy@ufcpredict.com</p>
                  <p>Address: 123 Analytics Way, Suite 456, Las Vegas, NV 89101</p>
                </div>
                
                <p className="mt-4">
                  We will respond to your inquiry as soon as possible and within the timeframe required 
                  by applicable law.
                </p>
              </div>
            </section>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 max-w-3xl mx-auto">
          <Link href="/terms">
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              Terms of Service
            </Button>
          </Link>
          <Link href="/cookies">
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              Cookies Policy
            </Button>
          </Link>
          <Link href="/disclaimer">
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300">
              Disclaimer
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Mail className="h-4 w-4 mr-2" />
            Contact Privacy Team
          </Button>
        </div>
      </div>
    </div>
  );
}
