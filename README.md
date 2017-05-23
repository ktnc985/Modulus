# NUSAtlas
# Introduction:
The objective of this project is to make the module mapping process more convenient for students going for SEP/NOC.

Currently, students who wish to create a module mapping that has not been approved before have to go through a tedious manual mapping process. They need to look through a list of modules offered by partner universities (PUs) and identify a module that is most similar in terms of contents, contact manner, contact hours and assessments to the one offered in NUS.

Our solution is to simplify this process by using natural language processing to generate a similarity report based on the descriptions of modules listed on NUS and the PUs’ websites. Only modules with a similarity percentage of 50% and above will be displayed. Thereby narrowing down the number of modules the student has to look through to find a potential match.

# Implementation of solution:
## Gathering of data (not fully implemented during orbital phase)
The data required can be split into 3 categories: 

1. NUS module data
2. PU module data
3. Pre-approved mappings

We plan to obtain the data on NUS modules through the NUSMods API. For PU module data and data on Pre-approved mappings, the data would ideally be obtained through web crawlers. However, this part of the project will not be implemented during Orbital due to time constraints. In addition, we will only be considering module mapping of SoC modules to modules from NTU for similar reasons. Module data from NTU will be obtained through the Modify API. Pre-approved module mappings will be extracted manually from the SoC website initially. The process will be automated later on if time permits.

## Processing of data
To create a basis of comparison between the NUS modules and the PU modules , we plan on using Latent Dirichlet Allocation(LDA) to generate topics based on word frequency from the modules description. The following python packages will be used:

- nltk: natural language processing toolkit
- stop_words: package containing list of stopwords
- gensim: package containing LDA model

Before the data can be analyzed it must first be cleaned. First, the text needs to be tokenized. This can be done using the nltk tokenization module.

Conjunctions and words like “the” don’t provide any significant meaning are removed from the tokenized text. The stop_words package provides a comprehensive list of these stopwords. With it, the stopwords can be removed by looping through our tokens and comparing each word to the list of stopwords.

Next, different forms of the same word like “run” and “running” are then reduced the their root form through a process called stemming. The Porter Stemmer Algorithm is one of the most widely used method of stemming and will be implemented by importing the Porter Stemmer module from the nltk package.

After the data is cleaned, we then generate a document-term matrix which tells us how frequently each word appears in the document. Once that is done, we can pass the data through the LDA model from the gensim package. The LDA model will output a list of topics. Each topic contains the most probable words to appear along with their probabilities. An example of this will be :

```python
['0.054*fundament + 0.054*concept' , '0.070*problem + 0.070*solv' ]
```

The topic models of two modules can then be compared to calculate the percentage match between the two models. We will need to do some experimentation to come up with the most suitable method to calculate the percentage match.

## Storing of data
We intend to store the data using MongoDB which is packaged with meteorJS.
Sample json format:

``` Javascript
    [{
      {
        "NUSModuleCode": "CS1010E",
        "PUModuleCode": "FE1008",
        "ModuleName": "Computing",
        "PUSyllabus": "<insert module description here>"
        “Link”: “http://www.cee.ntu.edu.sg/Students/Undergraduate/Curriculum/Pages/courses/FE1008.aspx”,
        "UniversityName": "Nanyang Technological University",
        “Region”: “Asia”,
        "Similarity": 50,
        "PrevMatch": true
      },
     ...
    }]
```
## UI/UX (implemented using Blaze/MeteorJS)
Users can search for modules by module code or module name and filter the results by region and PUs.
After the search, the site will display:

- a list of potential matches (with their module code, name and description) and their respective similarity percentages (Clicking on the module code will open the module page in a new tab)
- NUS module information (including module code, name and description)

to allow the user to compare and choose the most suitable match.

# Timeline:
|Week No. | Main Task |Side Tasks |Important deadlines|
|----------------|----------------|----------------|----------------|
|Week 1 (15th May) | Design & Implementation of first iteration of front end UI/UX | Pull and format data from NUS mods API and Modify API.   Manually extract pre-approved mappings from Soc webpage.| |
|Week 2 (22nd May) | Design & Implementation of first iteration of front end UI/UX |Pull and format data from NUS mods API and Modify API. Automate extracting pre-approved module mappings from SoC website |  |
|Week 3 (29th May) | Design & Implementation of first iteration of front end UI/UX | Pull and format data from NUS mods API and Modify API. Automate extracting pre-approved module mappings from SoC website | Evaluation Milestone 1|
|Week 4 (5th June) | Set up & integrate mongoDB database | Make changes to UI/UX based on user feedback| |
|Week 5 (12th June) | Set up & integrate mongoDB database | Make changes to UI/UX based on user feedback| |
|Week 6 (19th June) | Implement & Improve on NLP algorithm | Make changes to UI/UX based on user feedback. Testing of system with dummy data| |
|Week 7 (26th June) | Implement & Improve on NLP algorithm | Make changes to UI/UX based on user feedback. Testing of system with dummy data |Evaluation Milestone 2|
|Week 8 (3rd July)| Implement & Improve on NLP algorithm | Make changes to UI/UX based on user feedback. If NLP algorithm is already producing acceptable results, begin integration into the full system and expand the system to support another faculty | |
|Week 9 (10th July) | Implement & Improve on NLP algorithm | Minor tweaking of UI/UX. If NLP algorithm is already producing acceptable results, begin integration into the full system and expand the system to support another faculty| |
|Week 10 (17th July) | Integration & Testing of full system | Minor tweaking of UI/UX. Expand system to support another faculty if time permits| |
|Week 11(24th July) | Integration & Testing of full system | Minor tweaking of UI/UX.  Expand system to support another faculty if time permits |Evaluation Milestone 3|



