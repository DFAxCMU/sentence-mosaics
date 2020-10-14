'use strict';

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import { styles } from '../styles';
import { connect } from 'react-redux';
import  Question  from './Question';
import Swiper from 'react-native-swiper';

if (global.globalDeviceType == 'iPad') {
  var headingSize = 48;
  var bodySize = 20;
} else { // iPhone
  var headingSize = 24;
  var bodySize = 14;
}


const Info = () => (

  <Swiper showsButtons={true}>
        <ScrollView style={styles.infoContainer}>
            <Text style={{ fontSize: headingSize }}>
              What is Sentence Mosaics?
            </Text>
            <Text style={{ fontSize: bodySize }}> {"\n"}
            The purpose of this app is to assist students in their formulation of novel, complete, and meaningful spoken sentences produced in context with a photograph or illustration and with a language “coach” (speech-language therapist, teacher, parent, tutor, etc.) to assist in facilitating correct syntax.
            {"\n"} {"\n"}Students who can profit from the app include those with delayed language development (particularly with delayed oral expressive language skills), those whose hearing loss has impacted language skills, those for whom English is a second language, and those for whom written expression and/or reading is a challenge.
            The program may be of benefit as well to adults who have suffered language loss secondary to head trauma or CVA.
            {"\n"} {"\n"} </Text>
            </ScrollView>

        <ScrollView style={styles.infoContainer}>
            <Text style={{ fontSize: headingSize }}>App Usage</Text>
            <Text style={{ fontSize: bodySize }}> {"\n"}
               - This program has been used in context with visual images, such as commercially available photos that illustrate daily actions (washing, eating, climbing, brushing, etc.), more complex interactions (baking bread, serving dinner, cleaning the floor), cause-effect relationships and recognition of problems (cutting bread with a saw), and verb tense sequences (e.g. “He will peel the potatoes”; “He is peeling the potatoes”; “He did peel the potatoes”).  Illustrations from narratives, reproductions of paintings, and print ads can be used effectively.
               {"\n"} {"\n"}
              - To illustrate meaningfully and in context the use of the pronouns “I” and “we,” photos of the student(s), class, family, personal pets, etc.  should be used.  Because of the need for confidentiality, these should not be published but should remain on the students’ personal devices or on a classroom device that can be cleared when students complete their programs.  The photos stored on albums on individual iPads (student, teacher, therapist, or parent iPads) easily can be imported for direct use in sentence formulation through the tools in the “Sentence Mosaics” app.
               {"\n"} {"\n"}
              - This program is intended to be used in Direct Instruction where the language “coach” sits with a student (or students), provides models, prompts word retrieval and guides sentence formulation and production through questioning, gives immediate feedback, makes immediate corrections, and provides an opportunity for the corrected sentence to be produced aloud an additional one or more times.  Sentences can be written, typed (either on the iPad keyboard or on a separate keyboard connected to the iPad via Bluetooth), recorded and then played back on the iPad, saved to the iPad or deleted.  Several sentences can be produced on one topic to produce paragraphs if the student is at that level of development.
               {"\n"} {"\n"}
              - After a target photo has been selected for description either from commercially available materials or imported from an iPad photo album via the “Sentence Mosaics” app or taken via the embedded camera within the app itself, appropriate color tiles that represent different parts of speech can be selected by tapping in order to initiate sentence formulation.  The default sequence of three color tiles that automatically appears in the “Sentence Mosaic” app “window” includes Yellow for pronouns, Light Green for auxiliary verbs, and Dark Green for main verbs.  As each of those color tiles is tapped, preset choices (see additional explanation below) appear for selection, again by tapping, in the target sentence.  Additional parts of speech may be added to the sentence as more color tiles are tapped in order to expand sentence length.  However, if the default color tile sequence of “Yellow - Light Green - Dark Green” is not what is required for a specific sentence, all of those color tiles may be removed by means of a light, rapid, double tap on each tile.  Other color tiles then may be selected instead, as required for a novel sentence.  A punctuation mark from the white color tile can be selected last to indicate to reinforce to the student that a complete sentence/complete thought has been created.  If the student can retrieve from his or her own lexicon the noun, main verb, adjective, adverb, etc., that is needed, that word does not need to be typed; the student may benefit from trying to recall the word from memory, rather than just reading the entry, as explained further below.  If a part of speech has been selected in error, or if the student and therapist want to edit the sentence, a double tap on any color tile will delete that specific tile from the sentence formulation window, as indicated above.
               {"\n"} {"\n"}
              - While the option exists to type in any key words which the “coach” may find necessary, only the functor words have been printed in advance in the present program (additional functor words or additional words for other parts of speech such as nouns, adjectives, adverbs, etc., may be added and saved as needed by the instructor/therapist by using the available “+” option).  The pre-printed functor words are offered to act as guides to the student.  With only the color tiles in place (for example, orange for a noun, green for a verb, blue for an adjective, etc., for which the target word has NOT been pre-printed), the student is required to work on word retrieval, rather than just to rely on existing reading skills.  For some students, decoding skills may be quite good while retrieval skills may be weak.  Where students are frustrated with word retrieval, other cues may be given, such as the first sound in the target word, a word association, a gesture or pantomime, or a closure task.  The more often a student calls up a word independently, the more readily it is likely to be retrieved the next time it is needed.
               {"\n"} {"\n"}
              - If a student has trouble retrieving his/her lexicon for specific parts of speech, such as verbs, the target word can be embedded and modeled in the question.  For example, student may have trouble responding to “What is he doing?”  The language coach then could ask a more specific question, such as, “Is he washing his car?”
               {"\n"} {"\n"}
              - To assist students with the application of pronouns, a question first should be asked with the key noun, such as, “What is the man doing?” before the student is asked, “What is he doing?”
               {"\n"} {"\n"}
              - Because pronunciation of “-ed” as either the voiced phoneme /d/ or as an unvoiced /t/, depending upon whether the final consonant sound in a verb is voiced (as in “hug”) or unvoiced (as in “stop”) is an articulatory challenge for students with both language and articulation impairments and because so many verbs in English have irregular past participles, use of “did + main verb” has been a much easier construction that instantly conveys “past tense.”  Similarly, “will + main verb” conveys “future tense” with fewer words than “going to.”  Additional adverbs or adverbial phrases, such as “tomorrow” or “last week” can be added to refine time concepts.   When students are viewing a sequence of photo cards that show the progression of an activity, questions should be phrased to assist the student to perceive the required tense of the verb: “What will she do?” or “Will she brush her hair?”  Then, “What is she doing?” or “Is she brushing her hair?” Finally, “What did she do?” or “Did she brush her hair?”
               {"\n"} {"\n"}
              - As students become more confident and advanced, questions can be phrased so that negation is required.  For example, “Is she washing the dishes?” “No, she is washing the car.”  Or, “Is he wearing a blue suit?”  “No, he is wearing a black suit.”  Etc. Students also may be shown how to invert subject and verb to form questions when they are ready for that step.   For example, if the student’s question is, “Where I go?” the student can be helped to rephrase and expand the question to “Where do I go now?”
               {"\n"} {"\n"}
              - This approach also has been used successfully with students who have Specific Learning Disabilities with a goal for writing/written expressive language.  The students can be helped with including all needed parts of speech, word order, inflective endings, maintenance of verb tense, production of several sentences on one topic, and so forth.
               {"\n"} {"\n"}
              - This program is intended to be basic, flexible, and highly functional.  As students increase in language mastery, they should progress to other instructional materials.
               {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"}</Text>
        </ScrollView>

        <ScrollView style={styles.infoContainer}>
            <Text style={{ fontSize: headingSize }}>Background</Text>
            <Text style={{ fontSize: bodySize }}>  {"\n"}
            This app builds upon the original work of Edith Fitzgerald who published Straight Language for the Deaf in 1926.  Her seminal work utilized six symbols to represent parts of speech and correct word order.  Bessie Pugh made additional modifications to Fitzgerald’s system with the 1947 publication of Steps in Language Development for the Deaf.  The use of color to represent parts of speech (noun, pronoun, adjective, adverb, verb, etc.) and additional categories for functional usage of words (“social”) were added later as use of the Fitzgerald Key as a tool for instruction was expanded for students who did not have a hearing impairment but who had language needs.
            {"\n"} {"\n"}
            There have been many other commercially available sentence-building programs over the past several decades.  The present app evolved over several decades from personal, clinician-made materials -- first as a series of colored one-inch wooden cubes with key words written on them, then as laminated colored squares in a simple frame, and finally as soft foam color tiles upon which words easily could be written and which readily could be moved on a foam sentence frame with the attachment of Velcro “buttons”.
            {"\n"} {"\n"}
            The present speech-language pathologist has observed that the use of manipulable color tiles, thus making the words tangible and more concrete, has been highly effective in helping students to perceive word order (and change in word order for affirmative statements versus negation or questions), to know where to insert adjectives and adverbs, and to note when “functor words” (bound and unbound grammatical morphemes such as articles, prepositions, and auxiliary verbs) have been left out because of a typical pattern of omission errors.  Further, students have been supported effectively through seeing/reading/touching/removing/adding individual morphemes (meaningful word parts) in order to use correct subject verb agreement and to change verb tenses.  For example, if a student states, “I did going” or “I will going,” the teacher physically can remove the “-ing” to demonstrate that “-ing” is not employed when the auxiliary “did” or “will” are used.
            {"\n"} {"\n"}
            While the color-tile foamboard system has helped many students on caseload to produce longer and syntactically more correct sentences, the foamboard is awkward to carry and to use in settings outside of school.  The search for a means to develop a readily portable and convenient iPad app has taken years.   Without the intercession of a professor and countless hours of programming by students at Carnegie Mellon University, this app would not have become a reality.
            {"\n"} {"\n"} {"\n"} {"\n"} {"\n"} {"\n"}</Text>
        </ScrollView>

        <ScrollView style={styles.infoContainer}>
            <Text style={{ fontSize: headingSize }}>App Credits</Text>
            <Text style={{ fontSize: bodySize }}> {"\n"}
            Program development & implementation: Alyse O. Baker, CCC-SLP, Wexford, PA.
            {"\n"} {"\n"}
            Program design through Design for America: Jackie Kang, Christie Chang, Ashley Lai, Elizabeth Board, Ambika Chetal, Mehar Sawhney, Eddie Dryer, Sashank Gogula, and Jennifer Chou at Carnegie Mellon University, Pittsburgh, PA.
            {"\n"} {"\n"}
            Oversight: David Kosbie, Carnegie Mellon University
            {"\n"} {"\n"}
            Initial Liaison: Dr. Stephen Pellathy, Hampton Township School District, Allison Park, PA
            {"\n"} {"\n"}
            Thanks also are given to parents and to colleagues who generously gave their time and volunteered their children for initial trials while the app was in development.
            {"\n"} {"\n"} </Text>
        </ScrollView>

      </Swiper>
)

/* Container Component */

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)