PennController.ResetPrefix(null);
PennController.AddHost("https://amor.cms.hu-berlin.de/~petrenca/Hist_LE_stimuliV/"); // loads pictures from external server
//PennController.DebugOff() // use for the final version

// --------------------------------------------------------------------------------------------------------------
// Preamble

// FOR REAL PARTICIPANTS; check: # of trials, DebugOff, DELETE results file
PennController.Sequence("demographics", "instructions1", 
"familiarity-practice", "familiarity-start", 
subsequence(repeat(shuffle(randomize("critical"), randomize("filler")), 25) , "break"),
"post-instructions", "post-ques", "send", "final");

//PennController.Sequence("practicetrials")
    
//====================================================================================================================================================================================================================
// 1. Welcome page/demographics

PennController("demographics",
               // ENTER PROLIFIC ID
               newText("welcometext", "<p><b>Welcome to our experiment!</b><p>")
               .settings.css("font-size", "30px")
               ,
               newCanvas("welcomecanvas", 1000, 125)
               .settings.add("center at 50%", 0, getText("welcometext") )
               .print()
               ,
               newTextInput("proID", "")
               .before(newText("proID", "Before we begin, please enter your Prolific ID: ")
                       .settings.css("font-size", "20px"))
               .size(100, 20)
               .settings.center()
               .print()
               ,
               newText("blank","<p>")
               .print()
               ,
               newButton("start", "Continue")
               .settings.center()
               .print()
               .wait(getTextInput("proID")
                     .test.text(/[^\s]+/)
                     .success()
                     .failure(
                         newText("IDerror","Please enter your Prolific ID in order to continue.")
                         .settings.color("red")
                         .settings.center()
                         .print()
                     )  
                    )
               ,   
               getCanvas("welcomecanvas")
               .remove()
               ,
               getTextInput("proID")
               .remove()
               ,
               getButton("start")
               .remove()
               ,
               getText("IDerror")
               .remove()
               ,
               // ENTER DEMOGRAPHICS
               newText("demo", "<p>Before you continue to the instructions, we need to know a few things about you."
                       +" This information will remain anonymous. You can read more about how we handle your data in our Information Sheet below.<p>")              
               .settings.css("font-size", "20px")
               ,
               newCanvas("democanvas", 1000, 125)
               .settings.add(0, 0, getText("demo") )
               .print()
               ,
               newDropDown("age", "")
               .settings.add( "17 or younger" , "18" , "19" , "20", "21" , "22" , "23", "24" , "25" , "26", "27" , "28" , "29", "30" , "31" , "32 or older" )
               ,
               newText("agetext", "Age:")
               .settings.css("font-size", "20px")
               .settings.bold()
               //.settings.after( getDropDown("age") )    
               ,
               newCanvas("agecanvas", 1000, 45)
               .settings.add(0, 10, getText("agetext") )
               .settings.add(100, 8, getDropDown("age") )
               .print()    
               ,
               newText("sex", "Gender:")
               .settings.css("font-size", "20px")
               .settings.bold()
               ,
               newDropDown("sex", "" )
               .settings.add( "female", "male", "other")
               ,
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(0, 0, getText("sex") )
               .settings.add(120, 3, getDropDown("sex") )
               .print()
               ,
               newText("nativeEng", "<b>Were you raised monolingually in English?</b><br>(i.e., in English and only English?)")
               .settings.css("font-size", "20px")
               ,
               newTextInput("L2", "")
               .settings.hidden()
               ,
               newText("label input", "")
               .settings.after( getTextInput("L2") )
               ,
               newDropDown("language", "")
               .settings.log()
               .settings.add(  "yes", "no, I was (also) raised in:")    
               .settings.after(  getText("label input") )
               .settings.callback(                                             //whenever an option is selected, do this:
                   getDropDown("language")
                   .test.selected("no, I was (also) raised in:")                             //reveal the input box
                   .success( getTextInput("L2").settings.visible() )     //hide the input box
                   .failure( getTextInput("L2").settings.hidden()  )   
               )        
               ,
               newCanvas("languagecanvas", 1000, 25)
               .settings.add(0, 0, getText("nativeEng") )
               .settings.add(400, 2, getDropDown("language") )
               .print()
               ,
               newText("<p> ")
               .print()
               ,    
               newText("information", "<p>Before continuing the experiment, please read our"
                       +" <a href='https://amor.cms.hu-berlin.de/~pallesid/LE_Exp1_spr/LE1_SPR_info_sheet_final.pdf' target='_blank' >Participant's Information Sheet</a> and"
                       +" <a href='https://amor.cms.hu-berlin.de/~pallesid/LE_Exp1_spr/LE1_SPR_consentAgreement_final.pdf' target='_blank'>Consent Form</a>.<p>")    
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvastwo", 1000, 80)
               .settings.add(0, 0, getText("information") )
               .print()
               ,
               newText("browser_info", "<p>Please note that this experiment should only be run on <b>Mozilla Firefox</b> or <b>Google Chrome</b> and should <i>not</i> be run on a mobile phone.<p>")
               .settings.css("font-size", "20px")
               ,
               newCanvas("infocanvasthree", 1000, 115)
               .settings.add(0, 0, getText("browser_info") )
               .print()
               ,
               newText("consent", "By ticking the button below, I declare I have fully read and <br>understood the Participant's Information Sheet and Consent Form.<p>")
               .settings.css("font-size", "15px")  
               .settings.center()      
               .print()
               ,
               newButton("consent","Yes, I have read them.")
               .settings.center()
               .print()
               .wait()
               ,
               getDropDown("age")
               .test.selected()
               .success()
               .failure(
                   newText("ageerror","Please enter your age.")
                   .settings.color("red")
                   .print())   
               ,
               getDropDown("sex")
               .test.selected()
               .success()
               .failure(
                   newText("sexerror","Please ender your gender.")
                   .settings.color("red")
                   .print())
               ,
               getDropDown("language")
               .test.selected()
               .success()
               .failure(
                   newText("langerror","Please answer the question about your language history.")                   
                   .settings.color("red")
                   .print())      
               ,
               getDropDown("age").wait("first")
               ,
               getDropDown("sex").wait("first")
               ,
               getDropDown("language").wait("first")
               ,
               newButton("continue", "Continue to experiment")
               .settings.center()
               .print()
               .wait()
               
               ,
               getButton("consent")
               .remove()
               ,
               getButton("continue")
               .remove()
               ,
               getText("consent")
               .remove()
               ,
               getCanvas("infocanvastwo")
               .remove()
               ,
               newText("<p> ")
               .print()  
               ,
               // Create new variables from input
               newVar("IDage")
               .settings.global()
               .set( getDropDown("age") )
               ,
               newVar("IDsex")
               .settings.global()
               .set( getDropDown("sex") )
               ,
               newVar("IDling")
               .settings.global()
               .set( getDropDown("language") )
               ,
               newVar("whichL2")
               .settings.global()
               .set( getTextInput("L2") )
               ,
               newVar("proID")
               .settings.global()
               .set( getTextInput("proID") )
               ,
               // set 'yes' and 'no' keys
               newVar("yes_key")
               .settings.global()
               .set( "F" ) // for F-version
               // .set( "J" ) // for J-version
               ,
               // set 'no' key; this is necessary for the conditional in the practice round (for feedback)
               newVar("no_key")
               .settings.global()
               .set( "J" ) // for F-version
               // .set( "F" ) // for J-version
              )                                 //end of welcome screen
    
    
    .log("prolificID", getVar("proID"))
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("whichL2"))
    .log("type", "demo")
    .log("lifetime" , "demo")
    .log("tense", "demo")
    .log("mm", "demo")
    .log("match", "demo")
    .log("rating", "demo")
    .log("pretask", "demo")
    .log("pre_fam_key", "demo")
    .log("post_fam_key", "demo")
    .log("post_alive_key", "demo")
    .log("item" , "demo")
    .log("name" , "demo")  
    .log("list", "demo")
    .log( "withsquare", PennController.GetURLParameter("withsquare"))    
    .log("bare_verb", "demo")
    .log( "yes_key" , getVar("yes_key"))
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 2. Cancel

//====================================================================================================================================================================================================================
// 2. Intro/instructions

PennController( "instructions1",
                
                getVar("IDage")
                .testNot.is("17 or younger")   // if particpant is NOT under 17
                .and( getVar("IDage")
                      .testNot.is("32 or older")   // AND if particpant is NOT over 32
                     )
                .and(getVar("IDling")
                     .testNot.is("no, I was (also) raised in:")    // AND participant is NOT bi-lingual
                    )
                .success()   // continue as normal
                .failure(    // otherwise, send results and end prematurely
                    SendResults()  // for this to work within a PC, I changed the PC.js file (Edit your file PennController.js and replace occurrences of e=window.items.indexOf(n); (there should be 2) with e=window.items&&window.items.indexOf(n);)
                    ,
                    newText("bye", "<p>You are ineligible for this study, as you have provided information which is inconsistent with your Prolific prescreening responses. "
                            + "<p>Please return your submission on Prolific by selecting the 'Stop without completing' button."
                           )
                    .settings.css("font-size", "20px")
                    .settings.color("red")
                    .settings.bold()
                    .print()
                    ,
                    newText("bye2", "<p><b>Why was I excluded?</b><p>We used Prolific's prescreening options in order to recruit participants who are "
                            + "between the <b>ages of 18-31</b>, whose first/<b>native language is English</b>,<br> and who <b>grew up speaking only "
                            + "their native language</b> (which in this case should be English).<p> You must have indicated on the previous "
                            + "page that one of these is not true. If you think there has been a mistake, please let the researchers know via Prolific. <br>We have saved "
                            + "your responses and will gladly check them and pay you if there has been an error!"
                           )
                    .print()
                    .wait()
                )
                
                ,
                newText("intro", "<p><b>Thank you for taking part in our experiment!</b><p> "
                        + "The experiment consists of four parts: a 'familiarity' task, the experiment itself, and then two short post-experiment tasks. "
                        + "The whole process should take around 15 minutes.<p><p> "
                        + "Press the <b>spacebar</b> to continue to the instructions.<p><p>")
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas",900, 450)
                .settings.add(0,0, getText("intro"))
                .print()   
                ,
                newKey("intro"," ")
                .wait()
                ,
                getCanvas("introcanvas")
                .remove()
                ,
                newTimer("intro", 500)
                .start()
                .wait()
                ,                
                newText("set-up", "<p>Because <b>this is an experiment</b>, we would appreciate if you could take the following steps to ensure concentration:"
                        + "<p><t>&nbsp;&nbsp;&nbsp;&nbsp;&bull; "
                        + "<b>turn off any music</b>/audio you may be listening to"
                        + "<p>&nbsp;&nbsp;&nbsp;&nbsp;&bull; refrain from Googling or looking up information during the experiment"
                        + "<p><t>&nbsp;&nbsp;&nbsp;&nbsp;&bull; put your <b>phone on silent</b> and leave it face down or out of reach"
                        + "<p><t>&nbsp;&nbsp;&nbsp;&nbsp;&bull; attend to the experiment until it is over (there is a short break half way through)"
                        + "<p><t>&nbsp;&nbsp;&nbsp;&nbsp;&bull; in general behave as if you were in our laboratory!"
                        + "<p>These steps will help ensure the data we collect from you is high quality. "
                        + "<p>This window will <b>automatically enter full screen mode</b> before continuing. "
                        + "<br>To confirm you have taken the steps listed above, please <b>press the spacebar</b>. "
                        + "Full screen mode will then begin.")
                .settings.css("font-size", "20px")
                ,
                newCanvas("set-upcanvas",900, 450)
                .settings.add(0,0, getText("set-up"))
                .print()   
                ,
                newKey("set-up"," ")
                .wait()
                ,     
                fullscreen()
                ,
                getCanvas("set-upcanvas")
                .remove()
                ,
                newTimer("intro", 1500)
                .start()
                .wait()
                ,         
                newText("comp1_1", "<p>Now you are ready for the first task:</b>")
                .settings.css("font-size", "20px")
                ,        
                newText("comp1_2", "You will be presented with names of cultural figures, with the prompt <b><i>'familiar?'</i></b>. "
                        + "Please indicate whether you were <b>familiar with the cultural figure <i>before this experiment</i></b>, by pressing the 'F' or 'J' key. "
                        + "<p> Each prompt will time out after a few seconds, so please answer quickly!"
                        + "<p>Then, a new cultural figure will be presented with the same prompt. "
                        + "<p><p>After you have responded to all the prompts."
                        + "<p><p><b><i> Press the 'Continue' button to see some examples.")
                .settings.css("font-size", "20px")
                ,
                newCanvas("compCanv", 900, 450)
                .settings.add(0,0, getText("comp1_1"))
                .settings.add(0,100, getText("comp1_2")  )
                .print()   
                ,
                newButton("compStart", "Continue to the final task")
                .settings.center()
                .print()
                .wait()
               )
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


//====================================================================================================================================================================================================================
// Pre-task-practice

PennController.Template( PennController.GetTable( "master_spr_subset20_world.csv")
                         .filter("type" , "practice")
                         ,
                         variable => ["familiarity-practice",
                                      "PennController", PennController(
                                          defaultText
                                          .settings.css("font-family","courier")
                                          ,
                                          // add check and cross
                                          newImage("checkmark", "https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/checkmark.jpeg")
                                          .size(30,30)
                                          ,
                                          newImage("crossmark", "https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/crossmark.png")
                                          .size(30,30)
                                          ,
                                          // add photo
                                          newImage("photo", variable.file_name)
                                          .size (390)
                                          ,
                                          // dots
                                          newText("dots", "...")
                                          .print("center at 100vw","40vh")
                                          ,
                                          newTimer("dots", 1000)
                                          .start()
                                          .wait()
                                          ,
                                          getText("dots")
                                          .remove()
                                          ,
                                          // picture + name
                                          newCanvas("photo", 900, 400)
                                          .add("center at 50%", "center at 45%", getImage("photo"))
                                          .print()
                                          ,
                                          newText("name", variable.name)
                                          //.print()
                                          .settings.css("font-size", "30px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%","middle at 70%")
                                          ,
                                          newText("familiar", "familiar?")
                                          .settings.css("font-size", "20px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%","middle at 80%")
                                          ,
                                          newText("familiar-instru", "Are you familiar with this person/name?")
                                          .settings.css("font-size", "15px")
                                          .settings.css("font-family","times new roman")
                                          .settings.center()
                                          .settings.color("red")
                                          .print("center at 50%","middle at 85%")
                                          ,
                                          // print check and cross
                                          getImage("checkmark") // F-version
                                          //getImage("crossmark") // J-version
                                          .print("30vw","45vh")
                                          ,
                                          getImage("crossmark") // F-version
                                          //getImage("checkmark") // J-version
                                          .print("70vw","45vh")
                                          ,
                                          newKey("fam_resp", "FJ")
                                          .callback( getTimer("time_out1").stop() )
                                          .log("all")  
                                          ,
                                          newTimer("time_out1", 3000)
                                          .start()
                                          .log()
                                          .wait()
                                          ,
                                          getKey("fam_resp")
                                          .disable()
                                          ,
                                          newVar("fam_resp") // this will create a new variable "rating"
                                          //.settings.global()
                                          .set(getKey("fam_resp") )
                                          ,
                                          getText("familiar")
                                          .remove()
                                          ,
                                          getText("familiar-instru")
                                          .remove()
                                          ,
                                          getKey("fam_resp")
                                          .test.pressed()
                                          .success( )
                                          .failure( newText("failure", "Try to be faster!")
                                                    .settings.css("font-size", "15px")
                                                    .settings.italic()
                                                    .settings.bold()
                                                    .settings.css("font-family","times new roman")
                                                    .settings.center()
                                                    .settings.color("red")
                                                    .print("center at 50%","middle at 85%")
                                                    ,
                                                    newTimer("faster", 2000) .start()
                                                    .log()
                                                    .wait()
                                                    ,
                                                    getText("failure")
                                                    .remove()
                                                   )
                                          ,
                                          getImage("checkmark")
                                          .remove()
                                          ,   
                                          getImage("crossmark")
                                          .remove()
                                          ,
                                          getText("name")
                                          .remove()
                                          ,
                                      )
                                          .log("prolificID", getVar("proID"))
                                      .log("age", getVar("IDage"))
                                      .log("sex", getVar("IDsex"))
                                      .log("L2", getVar("IDling"))
                                      .log("whichL2", getVar("whichL2"))
                                      .log("type", variable.type)
                                      .log("lifetime" , variable.lifetime)
                                      .log("tense", variable.tense)
                                      .log("mm", variable.mm)
                                      .log("match", variable.match)
                                      .log("rating", variable.pretask)
                                      .log("pretask", "posttaskpractice")
                                      .log("pre_fam_key", "instr")
                                      .log("post_fam_key", getVar("fam_resp"))
                                      .log("post_alive_key", getVar("life_resp"))
                                      .log("item" , variable.item_id)
                                      .log("name" , variable.name)  
                                      .log("list", variable.list)
                                      .log( "withsquare", PennController.GetURLParameter("withsquare") )    
                                      .log("bare_verb", variable.bare)  
                                      .log( "yes_key" , getVar("yes_key"))
                                      
                                      
                                     ]
                        );

//====================================================================================================================================================================================================================
// 7. Pre-task start screen //

PennController( "familiarity-start",
                newText("comp1_1", "That was the practice round! You will now be presented with some more names. "
                        + "<p> Remember, use the 'F' and 'J' keys to answer the prompts. "
                        + "<p><p><b><i>Press the spacebar to continue.")
                .settings.css("font-size", "20px")
                ,
                newCanvas("compCanv", 900, 400)
                .settings.add(0,0, getText("comp1_1"))
                .print()   
                ,
                newKey("postStart", " ")
                .wait()
               )
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// Critical

PennController.Template( PennController.GetTable( "master_spr_subset20_world.csv")
                         .filter("type", "critical")
                         ,
                         variable => ["critical",
                                      "PennController", PennController(
                                          defaultText
                                          .settings.css("font-family","courier")
                                          ,
                                          // add check and cross
                                          newImage("checkmark", "https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/checkmark.jpeg")
                                          .size(30,30)
                                          ,
                                          newImage("crossmark", "https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/crossmark.png")
                                          .size(30,30)
                                          ,
                                          // add photo
                                          newImage("photo", variable.file_name)
                                          .size (390)
                                          ,
                                          // dots
                                          newText("dots", "...")
                                          .print("center at 100vw","40vh")
                                          ,
                                          newTimer("dots", 1000)
                                          .start()
                                          .wait()
                                          ,
                                          getText("dots")
                                          .remove()
                                          ,
                                          // picture + name
                                          newCanvas("photo", 900, 400)
                                          .add("center at 50%", "center at 45%", getImage("photo"))
                                          .print()
                                          ,
                                          newText("name", variable.name)
                                          //.print()
                                          .settings.css("font-size", "30px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%","middle at 70%")
                                          ,
                                          newText("familiar", "familiar?")
                                          //.print()
                                          .settings.css("font-size", "20px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%","middle at 80%")
                                          ,
                                          // print check and cross
                                          getImage("checkmark") // F-version
                                          //getImage("crossmark") // J-version
                                          .print("30vw","45vh")
                                          ,
                                          getImage("crossmark") // F-version
                                          //getImage("checkmark") // J-version
                                          .print("70vw","45vh")
                                          ,
                                          newKey("fam_resp", "FJ")
                                          .callback( getTimer("time_out1").stop() )
                                          .log("all")  
                                          ,
                                          newTimer("time_out1", 3000)
                                          .start()
                                          .log()
                                          .wait()
                                          ,
                                          getKey("fam_resp")
                                          .disable()
                                          ,
                                          newVar("fam_resp") // this will create a new variable "rating"
                                          //.settings.global()
                                          .set(getKey("fam_resp") )
                                          ,
                                          getText("familiar")
                                          .remove()
                                          ,
                                          getImage("checkmark")
                                          .remove()
                                          ,   
                                          getImage("crossmark")
                                          .remove()
                                          ,
                                          getText("name")
                                          .remove()
                                          ,
                                          getCanvas("photo")
                                          .remove()
                                      )
                                      .log("prolificID", getVar("proID"))
                                      .log("age", getVar("IDage"))
                                      .log("sex", getVar("IDsex"))
                                      .log("L2", getVar("IDling"))
                                      .log("whichL2", getVar("whichL2"))
                                      .log("type", variable.type)
                                      .log("lifetime" , variable.lifetime)
                                      .log("tense", variable.tense)
                                      .log("mm", variable.mm)
                                      .log("match", variable.match)
                                      .log("rating", "pretask")
                                      .log("pretask", variable.pretask)
                                      .log("pre_fam_key", getVar("fam_resp"))
                                      .log("post_fam_key", getVar("fam_resp"))
                                      .log("post_alive_key", getVar("life_resp"))
                                      .log("item" , variable.item_id)
                                      .log("name" , variable.name)  
                                      .log("list", variable.list)
                                      .log( "withsquare", PennController.GetURLParameter("withsquare") )    
                                      .log("bare_verb", variable.bare)  
                                      .log( "yes_key" , getVar("yes_key"))
                                      
                                      
                                     ]
                        );

//====================================================================================================================================================================================================================
// Critical

PennController.Template( PennController.GetTable( "master_spr_subset20_world.csv")
                         .filter("type", "filler")
                         ,
                         variable => ["filler",
                                      "PennController", PennController(
                                          defaultText
                                          .settings.css("font-family","courier")
                                          ,
                                          // add check and cross
                                          newImage("checkmark", "https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/checkmark.jpeg")
                                          .size(30,30)
                                          ,
                                          newImage("crossmark", "https://amor.cms.hu-berlin.de/~pallesid/dfg_pretests/pictures/crossmark.png")
                                          .size(30,30)
                                          ,
                                          // add photo
                                          newImage("photo", variable.file_name)
                                          .size (390)
                                          ,
                                          // dots
                                          newText("dots", "...")
                                          .print("center at 100vw","40vh")
                                          ,
                                          newTimer("dots", 1000)
                                          .start()
                                          .wait()
                                          ,
                                          getText("dots")
                                          .remove()
                                          ,
                                          // picture + name
                                          newCanvas("photo", 900, 400)
                                          .add("center at 50%", "center at 45%", getImage("photo"))
                                          .print()
                                          ,
                                          newText("name", variable.name)
                                          //.print()
                                          .settings.css("font-size", "30px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%","middle at 70%")
                                          ,
                                          newText("familiar", "familiar?")
                                          //.print()
                                          .settings.css("font-size", "20px")
                                          .settings.css("font-family","courier")
                                          .print("center at 50%","middle at 80%")
                                          ,
                                          // print check and cross
                                          getImage("checkmark") // F-version
                                          //getImage("crossmark") // J-version
                                          .print("30vw","45vh")
                                          ,
                                          getImage("crossmark") // F-version
                                          //getImage("checkmark") // J-version
                                          .print("70vw","45vh")
                                          ,
                                          newKey("fam_resp", "FJ")
                                          .callback( getTimer("time_out1").stop() )
                                          .log("all")  
                                          ,
                                          newTimer("time_out1", 3000)
                                          .start()
                                          .log()
                                          .wait()
                                          ,
                                          getKey("fam_resp")
                                          .disable()
                                          ,
                                          newVar("fam_resp") // this will create a new variable "rating"
                                          //.settings.global()
                                          .set(getKey("fam_resp") )
                                          ,
                                          getText("familiar")
                                          .remove()
                                          ,
                                          getImage("checkmark")
                                          .remove()
                                          ,   
                                          getImage("crossmark")
                                          .remove()
                                          ,
                                          getText("name")
                                          .remove()
                                          ,
                                          getCanvas("photo")
                                          .remove()
                                      )
                                      .log("prolificID", getVar("proID"))
                                      .log("age", getVar("IDage"))
                                      .log("sex", getVar("IDsex"))
                                      .log("L2", getVar("IDling"))
                                      .log("whichL2", getVar("whichL2"))
                                      .log("type", variable.type)
                                      .log("lifetime" , variable.lifetime)
                                      .log("tense", variable.tense)
                                      .log("mm", variable.mm)
                                      .log("match", variable.match)
                                      .log("rating", "pretask")
                                      .log("pretask", variable.pretask)
                                      .log("pre_fam_key", getVar("fam_resp"))
                                      .log("post_fam_key", getVar("fam_resp"))
                                      .log("post_alive_key", getVar("life_resp"))
                                      .log("item" , variable.item_id)
                                      .log("name" , variable.name)  
                                      .log("list", variable.list)
                                      .log( "withsquare", PennController.GetURLParameter("withsquare") )    
                                      .log("bare_verb", variable.bare)  
                                      .log( "yes_key" , getVar("yes_key"))
                                      
                                      
                                     ]
                        );



//====================================================================================================================================================================================================================
// 6. Break

PennController( "break" ,
                newCanvas("dots", 300, 100)
                .print()
                ,
                newText("break_text", "<p><b>Time for a short break!</b> <br><p>This break will end after 20 seconds. If you'd like to skip the break and go straight back to the experiment, <b>press the spacebar</b>.<p>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()    
                ,
                newTimer("break_timer", 20000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getKey("continue_exp")
                .remove()   
                ,
                newText("instructions_key2", "<br><b>Press the spacebar to continue to the experiment.</b></br>")
                .settings.css("font-size", "20px")
                .settings.center()
                .print()
                ,
                //continue:
                newKey("end_break", " ")
                .wait()
                ,  
                getText("instructions_key2")
                .remove()                  
                ,
                newTimer(1000)
                .start()
                .wait()             
               )   
    .log("prolificID", getVar("proID"))   
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("whichL2"))
    .log("type", "break")
    .log("lifetime" , "break")
    .log("tense", "break")
    .log("mm", "break")
    .log("match", "break")
    .log("rating", "break")
    .log("pretask", "break")
    .log("pre_fam_key", "break")
    .log("post_fam_key", "break")
    .log("post_alive_key", "break")
    .log("item" , "break")
    .log("name" , "break")  
    .log("list", "break")
    .log( "withsquare", PennController.GetURLParameter("withsquare"))    
    .log("bare_verb", "break")
    .log( "yes_key" , getVar("yes_key"))
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//====================================================================================================================================================================================================================
// 2. Post-task instructions

PennController( "post-instructions",
                newText("post_instructions", "<p><b>That concludes the experiment!</b><p> <p>Before we let you go, we have two short tasks for you. <p>The first is a questionnaire about the experiment you just did.<p><p>Press the spacebar to continue to the questionnaire.")                         
                .settings.css("font-size", "20px")
                ,
                newCanvas("introcanvas",900, 450)
                .settings.add(0,0, getText("post_instructions"))
                .print()   
                ,
                newKey("post_start"," ")
                .wait()
               )
    .log("prolificID", getVar("proID"))
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("whichL2"))
    .log("type", "post-instr")
    .log("lifetime" , "post-instr")
    .log("tense", "post-instr")
    .log("mm", "post-instr")
    .log("match", "post-instr")
    .log("rating", "post-instr")
    .log("pretask", "post-instr")
    .log("pre_fam_key", "post-instr")
    .log("post_fam_key", "post-instr")
    .log("post_alive_key", "post-instr")
    .log("item" , "post-instr")
    .log("name" , "post-instr")  
    .log("list", "post-instr")
    .log( "withsquare", PennController.GetURLParameter("withsquare") )    
    .log("bare_verb","post-instr")
    .log( "yes_key" , getVar("yes_key"))  
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);



// --------------------------------------------------------------------------------------------------------------
// 3. Post-experiment questionnaire

PennController("post-ques",
               newText("post-instruc", "Please answer the following questions about the experiment. <br>Try to be brief but informative.<p><p>")
               .settings.bold()
               .print()
               ,
               // Q1
               newText("notice", "1. Was there anything about the experiment that stood out to you? Any patterns/regularities, anything strange or surprising?")
               .print()
               ,
               newTextInput("notice")
               .size(600,50)
               .print()
               .log()
               ,
               newText("blank", "<p>")
               .print()
               ,
               newButton("next1", "Next Question")
               .print()
               .wait()
               ,
               getButton("next1")
               .remove()
               ,
               // Q2
               newText("about", "2. What do you think the experiment might have been about? Make as many guesses as you like.")
               .print()
               ,
               newTextInput("about")
               .size(600, 50)
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next2", "Next Question")
               .print()
               .wait()
               ,
               getButton("next2")
               .remove()
               ,
               //Q3
               newText("easyhard", "3. Was there anything you found particularly easy or difficult?")
               .print()
               ,
               newTextInput("easyhard","")
               .size(600, 50)
               .print()
               .log()
               ,     
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next3", "Next Question")
               .print()
               .wait()
               ,
               getButton("next3")
               .remove()
               ,
               // Q4
               newText("strategy", "4. Did you use any strategies during the experiment? If so, what were they?")
               .print()
               ,
               newTextInput("strategy","")
               .size(600, 50)
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,              
               newButton("next4", "Finished")
               .print()
               .wait()
               ,
               // create Vars
               newVar("notice") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("notice") )
               ,
               newVar("about") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("about") )
               ,
               newVar("easyhard") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("easyhard") )
               ,
               newVar("strategy") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("strategy") )
              )    
    .log("prolificID", getVar("proID"))  
    .log("age", getVar("IDage"))
    .log("sex", getVar("IDsex"))
    .log("L2", getVar("IDling"))
    .log("whichL2", getVar("whichL2"))
    .log("type", "post-ques")
    .log("lifetime" , "post-ques")
    .log("tense", "post-ques")
    .log("mm", "post-ques")
    .log("match", "post-ques")
    .log("rating", "post-ques")
    .log("pretask", "post-ques")
    .log("pre_fam_key", "post-ques")
    .log("post_fam_key", "post-ques")
    .log("post_alive_key", "post-ques")
    .log("item" , "post-ques")
    .log("name" , "post-ques")  
    .log("list", "post-ques")
    .log( "withsquare", PennController.GetURLParameter("withsquare"))    
    .log("bare_verb", "post-ques")
    .log("post-ques1", getVar("notice"))
    .log("post-ques2", getVar("about"))
    .log("post-ques3", getVar("easyhard"))
    .log("post-ques4", getVar("strategy")
        );

// --------------------------------------------------------------------------------------------------------------
// Send results

PennController.SendResults( "send" ); // important!!! Sends all results to the server

// --------------------------------------------------------------------------------------------------------------
// Prolific/Thank you screen

PennController.Template(PennController.GetTable( "validation.csv")// change this line for the appropriate experimental list
                        ,
                        variable => PennController( "final"
                                                    ,
                                                    newText("<p>Thank you for your participation!<br>You may now exit fullscreen mode by pressing the escape button (<i>'Esc'</i>)."
                                                            + "<p>Here is your validation code: <b>"+variable.val_code+".</b>"
                                                            + "<br><p>Enter this code <b>on the Prolific website immediately</b> in order to receive your payment.</p> If you wait too long, Prolific will mark your submission as 'timed out'."
                                                            + " This will interfere with the processing of your payment.")
                                                    .settings.css("font-size", "20px")
                                                    .settings.center()
                                                    .print()
                                                    ,
                                                    newButton("void")
                                                    .wait()
                                                   )
                        
                        .setOption("countsForProgressBar", false)    //overrides some default settings, such as countsForProgressBar
                        .setOption("hideProgressBar", true)
                       );

