
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: JSX.Element,
  }) {
    return (
           <>
          
           {children}
      
           </>
           
       
    );
  }