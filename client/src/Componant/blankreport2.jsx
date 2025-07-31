import Header from "../Componant/Header";
export default function ReportForm() {
  return (
    <>
      <Header />
      <div className="font-sans text-xs mt-6">
        <div className="max-w-[1600px] mx-auto border border-black ">
          <div className="grid grid-cols-2">
            {/* Left Column */}
            <div className="border-r-2 border-black p-1">
              <div className="font-bold mb-1 mt-4">Sender/supplier:</div>
              <textarea className="border border-black w-full h-[120px] p-1"></textarea>

              <div>
                <div className="font-bold mb-1">
                  Receiver/customer ( Name/ Code ):
                </div>
                <textarea className="border border-black w-full h-[120px] p-1"></textarea>

                {/* Supplier Information Grid */}
                <div>
                  <div className="grid grid-cols-2">
                    <div className="border-r border-black font-bold p-1 flex items-center">
                      Supplier
                    </div>
                    <div className="border-r border-black p-1 grid grid-cols-2">
                      <label className="block font-medium pt-2">
                        Supplier number:
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 p-1 mt-1"
                        placeholder="Enter supplier no"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      Test report-no.:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      part no./ subject no.:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      identification:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">drawing no.:</div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      level/date/index:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      ordering call no. / date:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      delivery note no./ date:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      supplied quantity:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">batch number:</div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-b border-black">
                    <div className="border border-black p-1">
                      weight of samples:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkboxes and Additional Sections */}
              <div className="p-2 space-y-2">
                <div>
                  <input type="checkbox" className="mr-2" /> documentation duty
                  (d-part, DmBA (special archives))
                </div>
                <div>
                  <input type="checkbox" className="mr-2" /> FMEA carried out
                </div>

                <div className="font-bold mt-2">
                  reason of sample inspection:
                </div>
                <div className="pl-4 space-y-1">
                  <label>
                    <input type="checkbox" className="mr-2" defaultChecked />{" "}
                    new parts
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> change of product
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> transfer of
                    production
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> changed
                    production method
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> longer
                    interruption of production
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> change of the
                    sub-supplier
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> new tools/
                    production facilities
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> remedying of a
                    deviation
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> other materials
                  </label>
                </div>

                <div className="font-bold mt-2">
                  Presentation step / acceptance step
                </div>
                <div className="pl-4 space-y-1">
                  <label>
                    <input type="checkbox" className="mr-2" /> 1 presentation
                    cover sheet (self certifying supplier)
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> 2 complete
                    acceptance at the customer
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> 3 complete
                    acceptance at the supplier
                  </label>
                </div>

                <div className="mt-3 font-bold">notes:</div>
                <textarea className="border border-black w-full h-20 p-1"></textarea>

                <div className="mt-3 font-bold">Confirmation of supplier:</div>
                <p>You hereby confirm that the sampling corresponding to</p>
                <div className="pl-4">
                  <label>
                    <input type="checkbox" className="mr-2" defaultChecked />{" "}
                    VDA Bd. 2 Ziff. 4
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" className="mr-2" /> QS 9000 PPAP
                    guideline
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="grid grid-cols-2">
                    <div className="font-bold">Name:</div>
                    <input
                      type="text"
                      className="border border-black w-[360px] h-6 p-1"
                    />
                  </div>
                  <br />
                  <div className="grid grid-cols-2">
                    <div className="font-bold">Department:</div>
                    <input
                      type="text"
                      className="border border-black w-[360px] h-6 p-1"
                    />
                  </div>
                  <br />
                  <div className="grid grid-cols-2">
                    <div className="font-bold">Phone/fax/e-mail:</div>
                    <input
                      type="text"
                      className="border border-black w-[360px] h-6 p-1"
                    />
                  </div>
                  <br />
                  <div className="grid grid-cols-2">
                    <div className="font-bold">Date:</div>
                    <input
                      type="date"
                      className="border border-black w-[360px] h-6 p-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="font-bold">Signature:</div>
                    <textarea className="border border-black w-full h-20 p-1"></textarea>
                  </div>
                </div>

                <div className="font-bold mt-2">distributor:</div>
                <input type="text" className="border border-black w-full p-1" />
              </div>
            </div>

            {/* Right Column */}
            <div className="p-1">
              <div>
                <label className="block mb-1">
                  <input type="checkbox" defaultChecked /> Initial Sample Report
                  VDA
                </label>
                <label className="block ml-5 mb-1">
                  <input type="checkbox" defaultChecked /> First Sample
                </label>
                <label className="block ml-5 mb-1">
                  <input type="checkbox" /> Following sample report
                </label>
                <label className="block mb-1">
                  <input type="checkbox" />
                  <strong>Test report of other samples</strong>
                </label>
                <input
                  type="text"
                  className="w-full mt-1 px-1 border border-black"
                />
              </div>

              {/* Enclosures */}
              <div className="gap-4 mb-4">
                <div>
                  <div className="font-bold mb-1">Enclosures:</div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <label>
                      1) <input type="checkbox" /> function report
                    </label>
                    <label>
                      10) <input type="checkbox" /> haptics / visual inspection
                    </label>
                    <label>
                      2) <input type="checkbox" defaultChecked /> dimension
                      report
                    </label>
                    <label>
                      11) <input type="checkbox" /> acoustics
                    </label>
                    <label>
                      3) <input type="checkbox" defaultChecked /> material
                      report
                    </label>
                    <label>
                      12) <input type="checkbox" /> odour
                    </label>
                    <label>
                      4) <input type="checkbox" /> reliability test
                    </label>
                    <label>
                      13) <input type="checkbox" /> list used compon./part
                      record
                    </label>
                    <label>
                      5) <input type="checkbox" /> Process capability
                      certificate
                    </label>
                    <label>
                      14) <input type="checkbox" /> certificates
                    </label>
                    <label>
                      6) <input type="checkbox" /> flow chart
                    </label>
                    <label>
                      15) <input type="checkbox" /> release of construction
                    </label>
                    <label>
                      7) <input type="checkbox" /> testing device capability
                    </label>
                    <label>
                      16) <input type="checkbox" /> materials in bought parts
                    </label>
                    <label>
                      8) <input type="checkbox" /> measuring methods
                    </label>
                    <label>
                      17) <input type="checkbox" /> others
                    </label>
                    <label>
                      9) <input type="checkbox" /> security data sheets
                    </label>
                    <label>
                      18) <input type="checkbox" /> deviation report
                    </label>
                  </div>
                </div>

                {/* Customer Information Grid */}
                <div className="pt-1">
                  <div className="grid grid-cols-2">
                    <div className="border-r border-black font-bold p-1 flex items-center">
                      Customer:
                    </div>
                    <div className="p-1 grid grid-cols-2">
                      <label className="block font-medium pt-2">
                        Customer number:
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 p-1 mt-1"
                        placeholder="Enter customer no"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      Test report-no.:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      part no. / subject no.:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      identification:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">drawing no.:</div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      level/date/index:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      unloading area:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      weight of samples:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      kind of material:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-black">
                    <div className="border border-black p-1">
                      receipt of goods-no./date:
                    </div>
                    <div className="border border-black p-1">
                      <input
                        type="text"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Table (converted from HTML table to div grid) */}
              <div className="overflow-x-auto pt-5">
                <div className="border border-black w-full text-xs">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1 font-bold text-left align-top">
                      Decision of customer:
                    </div>
                    <div className="border-r border-black px-2 py-1 font-bold text-center align-top">
                      released
                    </div>
                    <div className="border-r border-black px-2 py-1 font-bold text-center align-top">
                      free under conditions
                    </div>
                    <div className="px-2 py-1 font-bold text-center align-top">
                      refused
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      1) function report
                    </div>
                    <div className="border-r border-black text-center">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black text-center">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="text-center">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      2) dimension report
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      3) material report
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      4) reliability test
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      5) flow chart
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      6) testing device capability
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      7) process capability
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      8) measuring methods
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      9) security data sheets
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      10) haptics / visual inspection
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      11) acoustics
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      12) odour
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      13) list used compon./part record
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      14) certificates
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      15) release of construction
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      16) materials in bought parts
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 border-b border-black">
                    <div className="border-r border-black px-2 py-1">
                      17) deviation report
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4">
                    <div className="border-r border-black px-2 py-1">
                      <strong>complete decision</strong>
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div className="border-r border-black">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-2 mt-2">
                <div className="mt-1">deviation approval no.:</div>
                <input
                  type="text"
                  className="border border-black w-[240px] h-6 p-1"
                />
              </div>

              <div className="grid grid-cols-2 mt-2">
                <div className="mt-1">
                  If return shipment: delivery note no./date:
                </div>
                <input
                  type="text"
                  className="border border-black w-[240px] h-6 p-1"
                />
              </div>

              <textarea className="border border-black w-full h-20 p-1 text-xs leading-tight resize-none">
                Process, machine, production site, material, supplier, measuring
                devices are not allowed to be modified after release of this
                PPAP. All conditions must be fulfilled before a ...
              </textarea>

              <div className="mt-1 font-bold">notes:</div>
              <textarea className="border border-black w-full h-20 p-1"></textarea>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="grid grid-cols-2">
                  <div className="font-bold">Name:</div>
                  <input
                    type="text"
                    className="border border-black w-[360px] h-6 p-1"
                  />
                </div>
                <br />
                <div className="grid grid-cols-2">
                  <div className="font-bold">Department:</div>
                  <input
                    type="text"
                    className="border border-black w-[360px] h-6 p-1"
                  />
                </div>
                <br />
                <div className="grid grid-cols-2">
                  <div className="font-bold">Phone/fax/e-mail:</div>
                  <input
                    type="text"
                    className="border border-black w-[360px] h-6 p-1"
                  />
                </div>
                <br />
                <div className="grid grid-cols-2">
                  <div className="font-bold">Date:</div>
                  <input
                    type="date"
                    className="border border-black w-[360px] h-6 p-1"
                  />
                </div>
                <div className="col-span-2">
                  <div className="font-bold">Signature:</div>
                  <textarea className="border border-black w-full h-20 p-1"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
