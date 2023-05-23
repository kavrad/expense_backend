const Sib=require('sib-api-v3-sdk');

require('dotenv').config()
const client=Sib.ApiClient.instance
const apikey=client.authentications['api-key']
apikey.apikey='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';


exports.sendMail=async (email,subject,content)=>{
    const sendSmtpEmail=new Sib.SendSmtpEmail();
    sendSmtpEmail.sender={
        email:"kavyaht39@gmail.com"
    };
    sendSmtpEmail.to=[
        {email:email}
    ];
    sendSmtpEmail.subject=subject;
    sendSmtpEmail.textContent=content;
    const apiInstance=new Sib.TransactionalEmailsApi();
    try{
      const response=await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(`Email sent to ${email}`)
      return response;
    }catch(err){
      console.log(err);
      console.error(`Error sending email to ${email}`)
    }
}