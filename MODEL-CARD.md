# Model card: local direction-classification baseline v1

Purpose: demonstrate reproducible, inspectable text classification for transport research. Not a booking or safety model; predictions never update the sailing planner. Implementation and all training/test templates: research.js.

## Training

24 synthetic documents: eight directional phrase templates expanded over Liverpool, Heysham and Larne. Labels in/out refer to Isle of Man. Port names are normalised to PORT; lowercase alphabetic unigrams and adjacent bigrams form features. Multinomial Naive Bayes uses equal class priors and Laplace smoothing alpha=1. The model is trained locally at load time; there are no downloaded weights, API calls, tracking or retained queries.

## Evaluation

Twelve test phrases from four distinct templates expanded over the same three ports. All cases and the confusion matrix appear in research/results.json. Current result: 12/12 correct and zero abstentions on this small synthetic set. This score is not a claim of 100% accuracy in real use. Port substitution creates correlated examples; test templates share vocabulary with training; there is no independent human-labelled corpus, random sampling or confidence interval.

## Abstention and failure

Abstain if no known port, no island term or top-two log-score margin below 0.1. This heuristic is not calibrated probability and does not guarantee detection of unsupported input. Negation, multi-leg journeys, spelling errors, unseen wording and ambiguous endpoints may yield wrong predictions. Never use this model to select, book or assess the safety of a sailing. The experimental interface deliberately shows only direction. Dates, fares, capacity and operating status are outside the task.

## Improvement protocol

Collect consented, independently labelled non-sensitive queries; separate by phrase family and source; freeze an untouched evaluation set; report macro metrics, abstention coverage and errors against deterministic baselines. Do not train on private passenger data or claim gains from tuning to this tiny test set.
