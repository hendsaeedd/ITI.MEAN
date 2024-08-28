import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import JobDetails from './components/Job/jobDetails'
import JobList from './components/Job/jobList'
import JobForm from './components/Job/jobForm'
import AcceleratorList from './components/AcceleratorType/acceleratorList'
import AcceleratorDetails from './components/AcceleratorType/acceleratorDetails'
import CreateAccelerator from './components/AcceleratorType/createAccelerator'
import BillGenerator from './components/Billing/billGenerator'
import Instance from './components/InstanceType/instance'
import Container from './pages/container'
import NotFound from './pages/notfound'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Container />}>
          <Route index element={<JobList />} />
          <Route path='jobs' element={<JobList />} />
          <Route path='job/:id' element={<JobDetails />} />
          <Route path='create-job' element={<JobForm />} />
          <Route path='instance' element={<Instance />} />
          <Route path='accelerator' element={<AcceleratorList />} />
          <Route path='accelerator/:id' element={<AcceleratorDetails />} />
          <Route path='create-accelerator' element={<CreateAccelerator />} />
          <Route path='generateBill' element={<BillGenerator />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
