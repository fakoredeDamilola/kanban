import React from 'react'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'

const Container = styled.div`
height:100%;
        color:white;
        padding:15px 30px;
        h1{
            text-align:center;
        }
        p{
            padding:10px 0;
        }
`

const policy = () => {
  return (
    <Container>
        <h1>Privacy Policy</h1>
        <p>

<p>Effective Date: May 16, 2023</p>

This Privacy Policy outlines the information collection, use, and disclosure practices employed by Damilola ("we," "us," or "our") for the kanban App
<ol>

<li>
   Information We Collect

<p> Personal Information: When you use our App, we may collect certain personally identifiable information, including but not limited to: Name, Email address, Contact information, User preferences and settings
</p>
<p>
 Usage Data: We may also collect non-personal information about how you use the App, such as:, Device information (e.g., device type, operating system), Log data (e.g., IP address, access times), App usage metrics (e.g., feature usage, frequency of use)   
</p>

</li> 

<li>
    <p>Provide and Improve Services</p>
    <p>
      We use the collected information to provide and improve the functionality of our App, personalize user experiences, and enhance user satisfaction.   
    </p>

<p>
  Communication: We may use your contact information to respond to inquiries and provide important updates or notifications related to the App.  
</p>

<p>
  Aggregate Data: We may aggregate and anonymize the collected information to generate statistical or analytical insights for our internal purposes.  
</p>

</li>



<li>
    
  <p>Data Sharing and Disclosure</p>  
    <p>Third-Party Service Providers: We may engage trusted third-party service providers to assist us in delivering and improving our services. These providers are bound by confidentiality agreements and are prohibited from using personal information for any other purposes.</p>
    </li> 
    <p>
      Legal Compliance: We may disclose personal information if required by law, court order, or governmental regulation, or if we believe such action is necessary to protect our rights, property, or safety, or the rights, property, or safety of others.  
    </p>

<li>
<p>Data Security</p>
<p>
   We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure. 
</p>
</li>
<li>
<p>Data Retention</p>
<p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.</p>
</li>
<li>
<p>Children's Privacy</p>
<p>Our App is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If you become aware that your child has provided us with personal information without your consent, please contact us, and we will promptly delete such information.</p>
</li>
<li>
    <p>Changes to this Privacy Policy</p>
    <p>We reserve the right to modify or update this Privacy Policy at any time. We will notify you of any material changes through a prominent notice within the App.</p>
</li>
<li>
    <p>Contact Us</p>
    <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at <a href="mailto:dammy.fakorede@gmail.com">dammy.fakorede@gmail.com</a>.</p>
</li>



</ol>

        </p>
        </Container>
  )
}

policy.PageLayout = DashboardLayout
export default policy