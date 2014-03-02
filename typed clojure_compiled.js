if(!lt.util.load.provided_QMARK_('lt.plugins.typedclojure')) {
goog.provide('lt.plugins.typedclojure');
goog.require('cljs.core');
goog.require('lt.plugins.paredit');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.objs.command');
goog.require('clojure.string');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
goog.require('lt.objs.editor');
lt.plugins.typedclojure.adjust_line = (function adjust_line(loc,dir){if(cljs.core.truth_(loc))
{return cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"line","line",1017226086)], null),cljs.core._PLUS_,dir);
} else
{return null;
}
});
lt.plugins.typedclojure.seek_top = (function seek_top(ed,loc){var loc__$1 = loc;while(true){
var pars = cljs.core.re_pattern.call(null,"\\(|\\{|\\[");var cur = cljs.core.second.call(null,lt.plugins.paredit.scan.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ed","ed",1013907473),ed,new cljs.core.Keyword(null,"loc","loc",1014011570),loc__$1,new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"left","left",1017222009),new cljs.core.Keyword(null,"regex","regex",1122296761),pars,new cljs.core.Keyword(null,"skip","skip",1017436401),lt.plugins.paredit.in_string_QMARK_], null)));var adj = lt.objs.editor.adjust_loc.call(null,cur,-1);if(((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur) === 0)) || ((new cljs.core.Keyword(null,"ch","ch",1013907415).cljs$core$IFn$_invoke$arity$1(cur) == null)))
{return cur;
} else
{{
var G__8834 = adj;
loc__$1 = G__8834;
continue;
}
}
break;
}
});
lt.plugins.typedclojure.seek_bottom = (function seek_bottom(ed,loc){var __GT_top = (function (pos){return lt.objs.editor.adjust_loc.call(null,pos,1);
});var start = lt.plugins.typedclojure.seek_top.call(null,ed,loc);var end = cljs.core.second.call(null,lt.plugins.paredit.form_boundary.call(null,ed,__GT_top.call(null,start),null));return __GT_top.call(null,end);
});
lt.plugins.typedclojure.move_top = (function move_top(p__8826,dir){var map__8829 = p__8826;var map__8829__$1 = ((cljs.core.seq_QMARK_.call(null,map__8829))?cljs.core.apply.call(null,cljs.core.hash_map,map__8829):map__8829);var orig = map__8829__$1;var loc = cljs.core.get.call(null,map__8829__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__8829__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__8830 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__8830,0,null);var end = cljs.core.nth.call(null,vec__8830,1,null);if(cljs.core.truth_((function (){var and__6820__auto__ = start;if(cljs.core.truth_(and__6820__auto__))
{return end;
} else
{return and__6820__auto__;
}
})()))
{var dest = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))?lt.plugins.typedclojure.seek_bottom.call(null,ed,loc):lt.plugins.typedclojure.seek_top.call(null,ed,loc));return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.pseudoparedit.top","typedclojure.pseudoparedit.top",1462061138),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: move cursor to top level",new cljs.core.Keyword(null,"hidden","hidden",4091384092),true,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__6832__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.typedclojure","orig-pos","lt.plugins.typedclojure/orig-pos",3684609387).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__6832__auto__)
{return or__6832__auto__;
} else
{return lt.objs.editor.selection_QMARK_.call(null,ed);
}
})()))
{lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.typedclojure","orig-pos","lt.plugins.typedclojure/orig-pos",3684609387),lt.objs.editor.__GT_cursor.call(null,ed)], null));
} else
{}
return lt.plugins.paredit.batched_edits.call(null,lt.plugins.typedclojure.move_top.call(null,lt.plugins.paredit.ed__GT_info.call(null,ed),new cljs.core.Keyword(null,"left","left",1017222009)));
} else
{return null;
}
})], null));
lt.plugins.typedclojure.__GT_token_STAR_ = (function __GT_token_STAR_(e,loc){var opening_QMARK_ = (function (p1__8831_SHARP_){return (cljs.core._EQ_.call(null,"(",p1__8831_SHARP_)) || (cljs.core._EQ_.call(null,"[",p1__8831_SHARP_)) || (cljs.core._EQ_.call(null,"{",p1__8831_SHARP_));
});var closing_QMARK_ = ((function (opening_QMARK_){
return (function (p1__8832_SHARP_){return (cljs.core._EQ_.call(null,")",p1__8832_SHARP_)) || (cljs.core._EQ_.call(null,"]",p1__8832_SHARP_)) || (cljs.core._EQ_.call(null,"}",p1__8832_SHARP_));
});})(opening_QMARK_))
;var token_str = ((function (opening_QMARK_,closing_QMARK_){
return (function (pos){return new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,e,pos));
});})(opening_QMARK_,closing_QMARK_))
;var __GT_bound = ((function (opening_QMARK_,closing_QMARK_,token_str){
return (function (n){return lt.objs.editor.adjust_loc.call(null,loc,n);
});})(opening_QMARK_,closing_QMARK_,token_str))
;var s = token_str.call(null,loc);if(closing_QMARK_.call(null,s))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),__GT_bound.call(null,-1),new cljs.core.Keyword(null,"boundary","boundary",3193559964),true], null);
} else
{if(opening_QMARK_.call(null,s))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),__GT_bound.call(null,1),new cljs.core.Keyword(null,"boundary","boundary",3193559964),true], null);
} else
{if(cljs.core.empty_QMARK_.call(null,s))
{var tkn = token_str.call(null,__GT_bound.call(null,1));if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,tkn)))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"whitespace","whitespace",1290815983),true], null);
} else
{if(opening_QMARK_.call(null,tkn))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),__GT_bound.call(null,1),new cljs.core.Keyword(null,"boundary","boundary",3193559964),true], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"string","string",4416885635),tkn], null);
} else
{return null;
}
}
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"at","at",1013907365),loc,new cljs.core.Keyword(null,"string","string",4416885635),s], null);
} else
{return null;
}
}
}
}
});
lt.plugins.typedclojure.token_bounds_STAR_ = (function token_bounds_STAR_(e,loc){var token = lt.objs.editor.__GT_token.call(null,e,loc);var ln = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),ln,new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(token)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),ln,new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(token)], null)], null);
});
lt.plugins.typedclojure.typed_alias = "\n  (if-let [[a typedns] (first (filter #(= (find-ns 'clojure.core.typed)\n                                          (val %))\n                                       (ns-aliases *ns*)))]\n    (str a \"/\")\n    (str \"clojure.core.typed/\"))";
lt.plugins.typedclojure.aliased_LT__ = (function aliased_LT__(f){return [cljs.core.str(lt.plugins.typedclojure.typed_alias),cljs.core.str(" "),cljs.core.str(cljs.core.pr_str.call(null,f))].join('');
});
lt.plugins.typedclojure.qualified_LT__ = (function qualified_LT__(var$){return [cljs.core.str("\n       (let [s '"),cljs.core.str(var$),cljs.core.str("\n             ^clojure.lang.Var v (when (symbol? s) (resolve s))]\n         (cond\n          (not (var? v))      (when (symbol? s) (str s))\n          (not= *ns* (.ns v)) (str \"^:no-check \"\n                                   (symbol (str (ns-name (.ns v)))\n                                           (str (.sym v))))\n          :else               (str (name (symbol s)))))")].join('');
});
lt.plugins.typedclojure.raise_STAR_ = (function raise_STAR_(e,s){return lt.object.raise.call(null,e,new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),s,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"replace","replace",2108401190),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
});
lt.plugins.typedclojure.__GT_ann_var = (function __GT_ann_var(token){return [cljs.core.str("(str \"(\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"ann")),cljs.core.str("\" \""),cljs.core.str((cljs.core.truth_(token)?lt.plugins.typedclojure.qualified_LT__.call(null,token):" ")),cljs.core.str("\" Any)\""),cljs.core.str(")")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.ann.var","typedclojure.ann.var",3333302872),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: annotate var",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"string","string",4416885635),lt.objs.editor.selection.call(null,e)], null):lt.plugins.typedclojure.__GT_token_STAR_.call(null,e,c));if(cljs.core.truth_(new cljs.core.Keyword(null,"boundary","boundary",3193559964).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.objs.notifos.set_msg_BANG_.call(null,"core.typed/ann can only annotate vars");
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"whitespace","whitespace",1290815983).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.__GT_ann_var.call(null,null));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"typedclojure.pseudoparedit.top","typedclojure.pseudoparedit.top",1462061138));
lt.objs.editor.insert_at_cursor.call(null,e,"\n");
lt.objs.editor.move_cursor.call(null,e,lt.plugins.typedclojure.adjust_line.call(null,lt.objs.editor.__GT_cursor.call(null,e),-1));
return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.__GT_ann_var.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)));
} else
{return null;
}
}
}
})], null));
lt.plugins.typedclojure.__GT_ann_form = (function __GT_ann_form(s){return [cljs.core.str("(str \"(\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"ann-form")),cljs.core.str("\" \""),cljs.core.str((function (){var or__6832__auto__ = cljs.core.pr_str.call(null,s);if(cljs.core.truth_(or__6832__auto__))
{return or__6832__auto__;
} else
{return " ";
}
})()),cljs.core.str("\" Any)\""),cljs.core.str(")")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.ann.form","typedclojure.ann.form",4195321943),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: annotate form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string","string",4416885635),lt.objs.editor.selection.call(null,e),new cljs.core.Keyword(null,"selection","selection",3592905982),true], null):lt.plugins.typedclojure.__GT_token_STAR_.call(null,e,c));var bounds = cljs.core.List.EMPTY;if(cljs.core.truth_(new cljs.core.Keyword(null,"boundary","boundary",3193559964).cljs$core$IFn$_invoke$arity$1(token)))
{lt.objs.editor.move_cursor.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token));
lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891));
return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,lt.objs.editor.selection.call(null,e)));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"whitespace","whitespace",1290815983).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,null));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"selection","selection",3592905982).cljs$core$IFn$_invoke$arity$1(token)))
{return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{var vec__8833 = lt.plugins.typedclojure.token_bounds_STAR_.call(null,e,new cljs.core.Keyword(null,"at","at",1013907365).cljs$core$IFn$_invoke$arity$1(token));var start = cljs.core.nth.call(null,vec__8833,0,null);var end = cljs.core.nth.call(null,vec__8833,1,null);lt.objs.editor.set_selection.call(null,e,start,end);
return lt.plugins.typedclojure.raise_STAR_.call(null,e,lt.plugins.typedclojure.__GT_ann_form.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token)));
} else
{return null;
}
}
}
}
})], null));
lt.plugins.typedclojure.ns_checker = "(let [_ (require 'clojure.core.typed) check-ns-info (find-var 'clojure.core.typed/check-ns-info) _ (assert check-ns-info \"clojure.core.typed/check ns-info not found\") {:keys [delayed-errors]} (check-ns-info)] (if (seq delayed-errors) (for [^Exception e delayed-errors] (let [{:keys [env] :as data} (ex-data e)] (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\" (if (contains? data :form) (str (:form data)) 0) \"\n\" (str \"in: \" (:source env)) \"  \" (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\" (str \"namespace: \" (-> env :ns :name str)) \"\n\n\"))) \"No type errors found.\"))";
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.check.ns","typedclojure.check.ns",2147291153),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: check namespace",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.object.raise.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),lt.plugins.typedclojure.ns_checker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"inline","inline",4124874251),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
})], null));
lt.plugins.typedclojure.check_form = (function check_form(s){return [cljs.core.str("(if-let [res (seq (:delayed-errors (clojure.core.typed/check-form-info '"),cljs.core.str(s),cljs.core.str(")))] (for [^Exception e res] (let [{:keys [env] :as data} (ex-data e)] (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\" (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\" (if (contains? data :form) (str (:form data)) 0) \"\n\" (str \"in: \" (:source env)) \"\n\" (str \"namespace: \" (-> env :ns :name str)) \"\n\n\"))) (with-out-str (clojure.pprint/write (clojure.core.typed/cf "),cljs.core.str(s),cljs.core.str("))))")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.check.form","typedclojure.check.form",3571761296),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: check var or form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?lt.objs.editor.selection.call(null,e):new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,e,c)));return lt.object.raise.call(null,e,new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),lt.plugins.typedclojure.check_form.call(null,token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"inline","inline",4124874251),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
})], null));
}

//# sourceMappingURL=typed clojure_compiled.js.map