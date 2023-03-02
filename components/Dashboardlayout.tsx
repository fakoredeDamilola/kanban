
export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children:React.PropsWithChildren<{}>,
  }) {
    return (
           <>
          
           {children}
      
           </>
           
       
    );
  }