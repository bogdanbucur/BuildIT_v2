var DatatableRemoteAjaxDemo = function () {
    //== Private functions

    // basic demo
    var demo = function () {

        var datatable = $('#users_datatable').mDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        // sample GET method
                        method: 'GET',
                        url: '/user/data',
                        map: function (raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true,
                },
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            toolbar: {
                // toolbar items
                items: {
                    // pagination
                    pagination: {
                        // page size select
                        pageSizeSelect: [10, 20, 30, 50, 100],
                    },
                },
            },

            search: {
                input: $('#generalSearchInput'),
            },

            // columns definition
            columns: [
                {
                    field: 'user_id',
                    title: '#',
                    sortable: false, // disable sort for this column
                    width: 40,
                    selector: false,
                    textAlign: 'center',
                }, {
                    field: 'first_name',
                    title: 'First Name',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'last_name',
                    title: 'Last Name',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'role_code',
                    title: 'User Role',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'occupation',
                    title: 'Occupation',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'company_name',
                    title: 'Company',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'city',
                    title: 'City',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'country',
                    title: 'Country',
                    // sortable: 'asc', // default sort
                    filterable: false, // disable or enable filtering
                    width: 150,
                    // basic templating support for column rendering,
                }, {
                    field: 'activated',
                    title: 'Status',
                    // callback function support for column rendering
                    template: function (row) {
                        const status = {
                            false: {'title': 'Inactive', 'class': 'm-badge--warning'},
                            true: {'title': 'Active', 'class': 'm-badge--primary'},
                        };
                        return '<span class="m-badge ' + status[row.activated].class + ' m-badge--wide">' + status[row.activated].title + '</span>';
                    },
                }, {
                  field: 'Actions',
                  width: 110,
                  title: 'Actions',
                  sortable: false,
                  overflow: 'visible',
                  template: function (row) {
                    // var dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
                      let banButton = '';

                      if (row.activated === true && window.userPermissions.indexOf('BAN_USER') !== -1) {
                          banButton =  '<a href="/user/ban/' + row.user_id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" title="Ban User">\
                                            <i class="fa fa-ban"></i>\
                                        </a>';
                      }

                    return '\
                                <a href="/user/assign-role/' + row.user_id + '" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Assign role">\
                                    <i class="la la-edit"></i>\
                                </a>\
                                '+ banButton +'\
                            ';
                  },
                }
            ],
        });

        var query = datatable.getDataSourceQuery();


        $('#m_form_status').on('change', function () {
          // shortcode to datatable.getDataSourceParam('query');
          var query = datatable.getDataSourceQuery();
          query.activated = $(this).val().toLowerCase();
          // shortcode to datatable.setDataSourceParam('query', query);
          datatable.setDataSourceQuery(query);
          datatable.load();
        }).val(typeof query.activated !== 'undefined' ? query.activated : '');


        $('#m_form_type').on('change', function () {
            // shortcode to datatable.getDataSourceParam('query');
            var query = datatable.getDataSourceQuery();
            query['role.role_code'] = $(this).val();
            // shortcode to datatable.setDataSourceParam('query', query);
            datatable.setDataSourceQuery(query);
            datatable.load();
        }).val(typeof query['role.role_code'] !== 'undefined' ? query['role.role_code'] : '');

        $('#m_form_status, #m_form_type').selectpicker();

    };

    return {
        // public functions
        init: function () {
            demo();
        },
    };
}();

jQuery(document).ready(function () {
    DatatableRemoteAjaxDemo.init();
});