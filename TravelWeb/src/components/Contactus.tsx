import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';

const Contactus = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    // Send email to owner with the query
    emailjs.sendForm('service_neuuktv', 'template_2oawz5s', e.target, 'RW-_duuQ5Xph6kIFo')
      .then((result) => {
        console.log(result.text);
        toast.success('Your query has been sent');
      }, (error) => {
        console.log(error.text);
        // Handle error
      });

    // Send confirmation email to client
    emailjs.sendForm('service_neuuktv', 'template_7ammltm', e.target, 'RW-_duuQ5Xph6kIFo')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
      toast.error('Failed to send email');
    });
  };

  return (
    <section id="contactus" className="">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
        <form onSubmit={sendEmail} className="max-w-md mx-auto bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
              <Toaster
              className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out"></Toaster>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contactus;
