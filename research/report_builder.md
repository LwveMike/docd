## Implementation:

1. **Styling and Markdown:**
   - Implement the styling and markdown according to the provided design specifications ( if there are any, otherwise improvise, or take inspiration from other pages ).

1. **Component Creation:**
   - Develop a new Vue.js component specifically for the Report Builder.

1. **Vue Router Configuration:**
   - Integrate a new route into the Vue Router, directing it to `/docd/builder` or the route of your choices, if you have a better name for it.

1. **Customization Functionality:**
   - Enable users to customize the types of reports to be exported and their positioning on the page. Utilize the `@noction/vue-draggable-grid` for efficient an drag system.

1. **Export Functionality:**
   - Implement functionality that, upon user interaction, triggers a POST request to the `NAPId` with the corresponding data. This ensures that the customized report settings are sent to the backend for further processing.

1. **( To Be Discussed | maybe will not be implemented ) Templating System:**
   - Explore the possibility of incorporating a templating system. This system could allow users to save custom layouts, providing the flexibility to reuse or share layouts with other users. Discuss the specifics and feasibility of this feature with the team.

## Possible questions after reading, the implementation details:
1. Why we should create a Page for building Reports ? ( I want to export a single chart in a PDF file )
  - We have a task, in which is specified by some client that he wants to export his widgets to PDF. Implementing the report builder now will prevent future blockage or extensions failure. Also the report builder will allow single chart export.

1. What about the 6'th point, do we really need it ?
  - The 6'th point is flagged with **should be discussed** as it may not be a good idea and will be just time wasted and no business value.




















## Implementation

### 1. Create the directory `dev-mocks` in the `shared` directory

Create a new directory named `dev-mocks` within the `shared` directory. This directory will serve as the entry point for both `config` and `sd-notify` functionalities during the development phase. 

Inside the `dev-mocks` directory, implement `noop` methods for functionalities that are not used in the development phase. Additionally fill with values the `config` for development.

### 2. Create `.js` files with corresponding names

Create two JavaScript files inside the `dev-mocks` directory with the following names:

- `config-binding.js`: This file should contain the implementation of the `config` binding for development.

- `sd-notify-binding.js`: Similarly, implement the `sd-notify` binding in this file. Provide `noop` methods. 

Ensure that the `.js` files have the same names as their counterparts in the production environment (`config-binding.js` and `sd-notify-binding.js`), maintaining consistency for ease of reference.

### 3. Create a `.d.ts` file for typings

Develop a TypeScript declaration file (`.d.ts`) that provides typings for the `config-binding.js` and `sd-notify-binding.js` files.


Refer to the branch `FA-3693_base5` for inspiration on structuring the `dev-mocks` directory. Analyze how similar mock functionalities have been implemented in that branch to understand the approach and adapt it to the current requirements.














## About

We need to create or move specific chart components to `shared` because they will be used in `DOCd` page generation for export.

Also because we have some logic on the frontend that is used to process some values of the chart and manipulate data for tooltip and stuff, we should provide it to other `services` in the monorepo, so we can reuse the logic in `DOCd`.

In case we need some components that are not created, we should make them.








## About
This page will include the data about exported reports, from database table.
This may also include some utility ( we should discuss about what is really needed ) as:
1. Filtering by:
  - name
  - which chart it includes
  - state
  - ...
2. Clear all reports that are generated.
3. Delete 1 report.
4. Canceling 1 scheduled report.
5. Download report.

## Implementation

1. **Styling and Markdown:**
   - Implement the styling and markdown according to the provided design specifications ( if there are any, otherwise improvise, or take inspiration from other pages ).

2. **Component Creation:**
   - Develop a new Vue.js component specifically for the Report Builder.

3. **Vue Router Configuration:**
   - Integrate a new route into the Vue Router, directing it to `/docd/reports` or the route of your choices, if you have a better name for it.







## About

In this task, it should be initialized the workspace for DOCd, and configured it.

## Implementation

1. Create a new directory in `nfa/src/web/` with name `docd`.
2. Add necessary information in `pnpm-workspace.yaml` so it will be treaded as an app in the monorepo.
3. Choose a build tool for the whole service and initialize a library type project for specific `vue components` used in creating the `puppeteer` page.
4. Install `puppeteer-core` and point it to the browser instance ( Here you choose which one will be used ). You can download the browser instance with `npx @puppeteer/browsers install`.
5. Try to open a browser instance with puppeteer and a page.
6. Create a simple component using `vue` and `highcharts` and build it in the [UMD](https://www.oreilly.com/library/view/building-enterprise-javascript/9781788477321/03979156-167c-4598-85e8-0544241e2aed.xhtml#:~:text=UMD%2C%20or%20Universal%20Module%20Definition,a%20simple%20tag.).
7. Try to mount it in the browser's page instance.

## References
- You can take a look at https://github.com/LwveMike/docd







## About

We need to configure a Systemd Service that will manage `docd service`, the implementation details are up to the developer that will take this task.











## About

We need to log important steps in a document generation to keep track of errors, warning or actual bugs.

We don't need logging in the browser's page instance, because we will run the browser in headless mode and the logs will be pretty much useless.

Even though we have a Logger implementation in shared, I wouldn't recommend using it, because it is made for frontend, and `docd` will run on the server.

## Implementation

1. We can use [winston](https://www.npmjs.com/package/winston) as our logger, but if the developer taking this task has a better solution, it may use which module he wants.

2. We should have log levels the same as in `NAPID`, and the colors should be kept the same for no overhead between services.

3. ( To be discussed, maybe there is a better solution ) Use [cls-rtracer](https://www.npmjs.com/package/cls-rtracer) to persist ids of specific jobs and use them for logging.

4. Configure file logging and console logging.

## References

- For logger implementation you can take inspiration from `NAPID`









## About

We need an endpoint that will be responsible for handling report data after the user triggered report generation from Frontend.

## Implementation 

1. Create a Controller, Module and Service.

Other specific logic should be implemented as the developer likes.








## Implementation

1. The path can be `/report`, or how the developer that takes the task like to name it.
2. We need to describe this:
  - **GET** `/report` &rarr;  Returns all reports from `database`.
  - **GET** `/report/:id` &rarr;  Returns data about specific report from `database`.
  - **POST** `/report` &rarr;  Creates a report and inserts it in the `database`.

*The form of data should also be discussed*

*PUT actions are not needed ATM, but in the future we may need them. ( This should be discussed )*








## About

We need an websocket event for communication about report status.

This should be implemented both in `Frontend` and `NAPId` ( Frontend should be a listener and NAPId an emitter ).

The form of the payload should be discussed.










## About

We need to use our `node-addon` `sd-notify`, so we can communicate with `d-bus` and tell him that this component is alive.

Also here we should update the `database` in the `platform_status` table with our state.

In `DOCd` we need to create logic that will do that work in a interval of time.

## References

Look in `NAPID` how `sd-notify` service is implemented.










## About

Add browser instance on vm.

To download a browser instance that `puppeteer-core` can work with, you can run: `npx @puppeteer/browsers install`.

Also this should be symlinked as a constant name of the browser.

Eg. Downloaded bin name: `chrome_1.123.12345` &rarr; `chrome`.








## About

We need to implement a class responsible for `nats` communication. `NatsClient`
We need to implement a class to handle `puppeteer`. ( Browser [init, close], Page [init, load, export, close] ). `PuppeteerManager`
We need to implement a class that will distribute the workload for exporting. `JobManager`

## Implementation

1. DOCd Frontend Part:
   - Create a Wrapper component that based on the payload provided, it should render the page. The payload can come in two ways ( For documents generated instantly, For documents that should be generated by a schedule )
   - Charts also should have the posibility for styledMode and all animations should be disabled.

2. DOCd server:
   - There should be initialized a `nats` client that will listen for some events from `NAPId` or `APId`, and should also be able to send events to `APId`.

   - For instantly documents, NatsClient will listen for an event from `APId` that will provide payload from `REPORTd`. After that there will be a job created in the pool. Based on the PriorityQueue the `JobManager` should give a job to `PuppeteerManager` that will be exported.

   - For scheduled documents, there should be a pooling mechanism on `DOCd` that will read the `database` on an interval for table `documents` and will check the `export_at` fields to see if that value its included in the current time frame. If there are such documents we should publish a nats event to `APId` to collect the corresponding data and to respond with it to `DOCd`. Then the `JobManager` and `PuppeteerManager` logic will be called.

   - `PuppeteerManager` should be able to communicate with the actual webpage built via `expose functions` from `puppeteer`. This should be constructed in such a way to mimic an Event based communication.

   - For pages created with `PuppeteerManager` we should decorate the page with some metadata that will help us manage them better on the server.

   - The whole implementation is not yet thought about, so a lot of things may change, or are to be decided by the Developer that takes this task.

## Legend
- `instantly &rarr; That should be generated when the user trigger the generation of the Frontend.
- `generated by a schedule &rarr; When a user adds a subscription for a document template that should be resolved in the future.

## References
- You can take a look at [DOCd](https://github.com/LwveMike/docd)











## About

We need to make `DOCd` in the binary format so we don't need `node` on the server to run it. There are some assets that should be added, mostly things that construct the page in the headless browser. For the moment we will build with `pkg` npm module and with `node 18`.

You can take a look in the `NAPId` for references.

## References

- `NAPId`
- You can take a look at [DOCd](https://github.com/LwveMike/docd)
















