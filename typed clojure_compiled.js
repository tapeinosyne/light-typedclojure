if(!lt.util.load.provided_QMARK_('lt.plugins.typedclojure')) {
goog.provide('lt.plugins.typedclojure');
goog.require('cljs.core');
goog.require('lt.plugins.paredit');
goog.require('lt.plugins.paredit');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.command');
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
var G__9529 = adj;
loc__$1 = G__9529;
continue;
}
}
break;
}
});
lt.plugins.typedclojure.seek_bottom = (function seek_bottom(ed,loc){var __GT_top = (function (pos){return lt.objs.editor.adjust_loc.call(null,pos,1);
});var start = lt.plugins.typedclojure.seek_top.call(null,ed,loc);var end = cljs.core.second.call(null,lt.plugins.paredit.form_boundary.call(null,ed,__GT_top.call(null,start),null));return __GT_top.call(null,end);
});
lt.plugins.typedclojure.move_top = (function move_top(p__9522,dir){var map__9525 = p__9522;var map__9525__$1 = ((cljs.core.seq_QMARK_.call(null,map__9525))?cljs.core.apply.call(null,cljs.core.hash_map,map__9525):map__9525);var orig = map__9525__$1;var loc = cljs.core.get.call(null,map__9525__$1,new cljs.core.Keyword(null,"loc","loc",1014011570));var ed = cljs.core.get.call(null,map__9525__$1,new cljs.core.Keyword(null,"ed","ed",1013907473));var vec__9526 = lt.plugins.paredit.form_boundary.call(null,ed,loc,null);var start = cljs.core.nth.call(null,vec__9526,0,null);var end = cljs.core.nth.call(null,vec__9526,1,null);if(cljs.core.truth_((function (){var and__7084__auto__ = start;if(cljs.core.truth_(and__7084__auto__))
{return end;
} else
{return and__7084__auto__;
}
})()))
{var dest = ((cljs.core._EQ_.call(null,dir,new cljs.core.Keyword(null,"right","right",1122416014)))?lt.plugins.typedclojure.seek_bottom.call(null,ed,loc):lt.plugins.typedclojure.seek_top.call(null,ed,loc));return cljs.core.update_in.call(null,orig,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edits","edits",1110263579)], null),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"cursor","cursor",3959752392),new cljs.core.Keyword(null,"from","from",1017056028),dest,new cljs.core.Keyword(null,"to","to",1013907949),dest], null));
} else
{return orig;
}
});
lt.plugins.typedclojure.token_BANG__QMARK_ = (function token_BANG__QMARK_(coll){var e = lt.objs.editor.pool.last_active.call(null);var s = new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(coll);var opening_QMARK_ = cljs.core.partial.call(null,cljs.core.re_seq,/\(|\[|\{/);var closing_QMARK_ = cljs.core.partial.call(null,cljs.core.re_seq,/\)|\]|\}/);var blank_QMARK_ = cljs.core.partial.call(null,cljs.core.re_seq,/\s/);var __GT_bound = ((function (e,s,opening_QMARK_,closing_QMARK_,blank_QMARK_){
return (function (n){return lt.objs.editor.adjust_loc.call(null,lt.objs.editor.__GT_cursor.call(null,e),n);
});})(e,s,opening_QMARK_,closing_QMARK_,blank_QMARK_))
;if(cljs.core.truth_(closing_QMARK_.call(null,s)))
{lt.objs.editor.move_cursor.call(null,e,__GT_bound.call(null,-1));
return false;
} else
{if(cljs.core._EQ_.call(null,"",s))
{var b = lt.objs.editor.__GT_token.call(null,e,__GT_bound.call(null,1));if(cljs.core.truth_(opening_QMARK_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(b))))
{return lt.objs.editor.move_cursor.call(null,e,__GT_bound.call(null,1));
} else
{return false;
}
} else
{if(cljs.core.truth_(blank_QMARK_.call(null,s)))
{return false;
} else
{if(cljs.core.truth_(opening_QMARK_.call(null,s)))
{lt.objs.editor.move_cursor.call(null,e,__GT_bound.call(null,1));
return false;
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return coll;
} else
{return null;
}
}
}
}
}
});
lt.plugins.typedclojure.form_QMARK_ = (function form_QMARK_(e,loc){var vec__9528 = lt.plugins.paredit.form_boundary.call(null,e,loc,null);var start = cljs.core.nth.call(null,vec__9528,0,null);var end = cljs.core.nth.call(null,vec__9528,1,null);if((cljs.core.not_EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null),lt.plugins.paredit.form_boundary.call(null,e,loc,null))) || (cljs.core.not_EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null),lt.plugins.paredit.form_boundary.call(null,e,lt.objs.editor.adjust_loc.call(null,loc,-1),null))) || (cljs.core.not_EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null),lt.plugins.paredit.form_boundary.call(null,e,lt.objs.editor.adjust_loc.call(null,loc,1),null))))
{return true;
} else
{return false;
}
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.pseudoparedit.top","typedclojure.pseudoparedit.top",1462061138),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: move cursor to top level",new cljs.core.Keyword(null,"hidden","hidden",4091384092),true,new cljs.core.Keyword(null,"exec","exec",1017031683),(function (type){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_((function (){var or__7096__auto__ = cljs.core.not.call(null,new cljs.core.Keyword("lt.plugins.typedclojure","orig-pos","lt.plugins.typedclojure/orig-pos",3684609387).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)));if(or__7096__auto__)
{return or__7096__auto__;
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
lt.plugins.typedclojure.typed_alias = "\n  (if-let [[a typedns] (first (filter #(= (find-ns 'clojure.core.typed)\n                                          (val %))\n                                       (ns-aliases *ns*)))]\n    (str a \"/\")\n    (str \"clojure.core.typed/\"))";
lt.plugins.typedclojure.aliased_LT__ = (function aliased_LT__(f){return [cljs.core.str(lt.plugins.typedclojure.typed_alias),cljs.core.str(" "),cljs.core.str(cljs.core.pr_str.call(null,f))].join('');
});
lt.plugins.typedclojure.qualified_LT__ = (function qualified_LT__(var$){return [cljs.core.str("\n       (let [s '"),cljs.core.str(var$),cljs.core.str("\n             ^clojure.lang.Var v (when (symbol? s) (resolve s))]\n         (cond\n          ; if unresolved just insert whatever is given\n          (not (var? v))\n          (when (symbol? s) (str s))\n          ; fully qualify all vars outside current namespace\n          ; also add :no-check prefix\n          (not= *ns* (.ns v))\n          (str \"^:no-check \"\n               (symbol (str (ns-name (.ns v)))\n                       (str (.sym v))))\n          :else\n          (str (name (symbol s)))))")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.ann.var","typedclojure.ann.var",3333302872),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: annotate var",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?lt.objs.editor.selection.call(null,e):new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,e,c)));var __GT_ann_var = [cljs.core.str("(str \"(\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"ann")),cljs.core.str("\" \""),cljs.core.str(lt.plugins.typedclojure.qualified_LT__.call(null,token)),cljs.core.str("\" Any)\""),cljs.core.str(")")].join('');lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"typedclojure.pseudoparedit.top","typedclojure.pseudoparedit.top",1462061138));
lt.objs.editor.insert_at_cursor.call(null,e,"\n");
lt.objs.editor.move_cursor.call(null,e,lt.plugins.typedclojure.adjust_line.call(null,lt.objs.editor.__GT_cursor.call(null,e),-1));
return lt.object.raise.call(null,e,new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),__GT_ann_var,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"replace","replace",2108401190),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.ann.form","typedclojure.ann.form",4195321943),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: annotate form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = lt.objs.editor.__GT_token.call(null,e,c);var sym = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?false:(cljs.core.truth_(lt.plugins.typedclojure.token_BANG__QMARK_.call(null,token))?cljs.core.update_in.call(null,cljs.core.conj.call(null,token,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(c)], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"string","string",4416885635)], null),cljs.core.pr_str):((new cljs.core.Keyword(null,"else","else",1017020587))?false:null)));var __GT_ann_form = [cljs.core.str("(str \"(\""),cljs.core.str(lt.plugins.typedclojure.aliased_LT__.call(null,"ann-form")),cljs.core.str("\" \""),cljs.core.str((function (){var or__7096__auto__ = new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(sym);if(cljs.core.truth_(or__7096__auto__))
{return or__7096__auto__;
} else
{return "__SELECTION*__";
}
})()),cljs.core.str("\" Any)\""),cljs.core.str(")")].join('');if(cljs.core.truth_(sym))
{lt.objs.editor.set_selection.call(null,e,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(sym),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(sym)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(sym),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(sym)], null));
} else
{lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"paredit.select.parent","paredit.select.parent",4454322891));
}
return lt.object.raise.call(null,e,new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),__GT_ann_form,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"replace","replace",2108401190),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
})], null));
lt.plugins.typedclojure.ns_checker = "(let [_ (require 'clojure.core.typed) check-ns-info (find-var 'clojure.core.typed/check-ns-info) _ (assert check-ns-info \"clojure.core.typed/check ns-info not found\") {:keys [delayed-errors]} (check-ns-info)] (if (seq delayed-errors) (for [^Exception e delayed-errors] (let [{:keys [env] :as data} (ex-data e)] (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\" (if (contains? data :form) (str (:form data)) 0) \"\n\" (str \"in: \" (:source env)) \"  \" (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\" (str \"namespace: \" (-> env :ns :name str)) \"\n\n\"))) \"No type errors found.\"))";
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.check.ns","typedclojure.check.ns",2147291153),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: check namespace",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){return lt.object.raise.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),lt.plugins.typedclojure.ns_checker,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"inline","inline",4124874251),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
})], null));
lt.plugins.typedclojure.check_form = (function check_form(s){return [cljs.core.str("(if-let [res (seq (:delayed-errors (clojure.core.typed/check-form-info '"),cljs.core.str(s),cljs.core.str(")))] (for [^Exception e res] (let [{:keys [env] :as data} (ex-data e)] (list (first (clojure.string/split (.getMessage e) #\"\nHint\")) \"\n\" (str \"{line: \" (:line env)) \" \" (str \"ch: \" (:column env) \"}\") \"\n\" (if (contains? data :form) (str (:form data)) 0) \"\n\" (str \"in: \" (:source env)) \"\n\" (str \"namespace: \" (-> env :ns :name str)) \"\n\n\"))) (with-out-str (clojure.pprint/write (clojure.core.typed/cf "),cljs.core.str(s),cljs.core.str("))))")].join('');
});
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"typedclojure.check.form","typedclojure.check.form",3571761296),new cljs.core.Keyword(null,"desc","desc",1016984067),"Typed Clojure: check var or form",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var e = lt.objs.editor.pool.last_active.call(null);var c = lt.objs.editor.__GT_cursor.call(null,e);var token = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,e))?lt.objs.editor.selection.call(null,e):new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_token.call(null,e,c)));return lt.object.raise.call(null,lt.objs.editor.pool.last_active.call(null),new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),lt.plugins.typedclojure.check_form.call(null,token),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"inline","inline",4124874251),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),true], null));
})], null));
}

//# sourceMappingURL=typed clojure_compiled.js.map